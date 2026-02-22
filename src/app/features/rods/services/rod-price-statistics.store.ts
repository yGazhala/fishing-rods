import { computed, inject, Injectable, signal } from '@angular/core';
import { DbService } from '../../../database/db-service';
import { CurrencyCode } from '../../../types/currency-code';
import { LineChartData } from '../types/line-chart-data';
import { catchError, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { PriceLineChartDataByCurrency } from '../types/price-line-chart-data-by-currency';
import { advertisementsToPriceLineChartDataByCurrency } from '../utils/rod-price-statistics/advertisements-to-price-line-chart-data-by-currency';
import { PriceStatisticsSummary } from '../types/price-statistics-summary';
import { Price } from '../types/price';
import { getLatestPriceFromStatisticsSummary } from '../utils/rod-price-statistics/get-latest-price-from-statistics-summary';
import { advertisementsToPriceStatisticsSummary } from '../utils/rod-price-statistics/advertisements-to-price-statistics-summary';
import { UserProfileSettingsStore } from '../../../core/services/user-profile-settings.store';

@Injectable()
export class RodPriceStatisticsStore {
  private dbService = inject(DbService);
  private userSettings = inject(UserProfileSettingsStore);

  private loadPriceLineChartDataRequest = new Subject<{ rodId: string }>();
  private loadPriceStatisticsSummaryRequest = new Subject<{ rodId: string }>();

  public selectedCurrency = signal<CurrencyCode>(this.userSettings.defaultCurrency());

  private priceLineChartDataByCurrency = signal<PriceLineChartDataByCurrency>({});
  public isPriceLineChartDataLoading = signal(false);
  public priceLineChartDataErrorMessage = signal<string | undefined>(undefined);

  public priceLineChartData = computed((): LineChartData | undefined => {
    const dataByCurrency = this.priceLineChartDataByCurrency();
    const currency = this.selectedCurrency();
    return dataByCurrency[currency];
  });

  private priceStatisticsSummary = signal<PriceStatisticsSummary>({});
  public isPriceStatisticsSummaryLoading = signal(false);
  public priceStatisticsSummaryErrorMessage = signal<string | undefined>(undefined);

  public latestPriceNew = computed((): Price | undefined => {
    const summary = this.priceStatisticsSummary();
    const currency = this.selectedCurrency();
    return getLatestPriceFromStatisticsSummary(summary, currency, false);
  });

  public latestPriceUsed = computed((): Price | undefined => {
    const summary = this.priceStatisticsSummary();
    const currency = this.selectedCurrency();
    return getLatestPriceFromStatisticsSummary(summary, currency, true);
  });

  private onLoadPriceLineChartData: Observable<undefined> = this.loadPriceLineChartDataRequest.pipe(
    tap(() => this.isPriceLineChartDataLoading.set(true)),
    switchMap(({ rodId }) => {
      return this.dbService.getAdvertisementsByRodDescending(rodId).pipe(
        tap((advertisements) => {
          const result = advertisementsToPriceLineChartDataByCurrency(advertisements);
          this.priceLineChartDataByCurrency.set(result);
          this.isPriceLineChartDataLoading.set(false);
        }),
        map(() => undefined),
        catchError((error) => {
          this.priceLineChartDataErrorMessage.set(
            error?.message || 'Failed to load price statistics',
          );
          this.isPriceLineChartDataLoading.set(false);
          return of(undefined);
        }),
      );
    }),
  );

  private onLoadPriceStatisticsSummary: Observable<undefined> =
    this.loadPriceStatisticsSummaryRequest.pipe(
      tap(() => this.isPriceStatisticsSummaryLoading.set(true)),
      switchMap(({ rodId }) => {
        return this.dbService.getAdvertisementsByRodDescending(rodId).pipe(
          tap((advertisements) => {
            const result = advertisementsToPriceStatisticsSummary(advertisements);
            this.priceStatisticsSummary.set(result);
            this.isPriceStatisticsSummaryLoading.set(false);
          }),
          map(() => undefined),
          catchError((error) => {
            this.priceStatisticsSummaryErrorMessage.set(
              error?.message || 'Failed to load price statistics',
            );
            this.isPriceStatisticsSummaryLoading.set(false);
            return of(undefined);
          }),
        );
      }),
    );

  constructor() {
    this.onLoadPriceLineChartData.subscribe();
    this.onLoadPriceStatisticsSummary.subscribe();
  }

  public setCurrency(currency: CurrencyCode): void {
    this.selectedCurrency.set(currency);
  }

  public loadPriceLineChartData(rodId: string): void {
    this.loadPriceLineChartDataRequest.next({ rodId });
  }

  public loadPriceStatisticsSummary(rodId: string): void {
    this.loadPriceStatisticsSummaryRequest.next({ rodId });
  }
}
