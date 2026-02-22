import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { UserProfileSettings } from '../../types/user-profile-settings';
import { DbService } from '../../database/db-service';
import { CurrencyCode } from '../../types/currency-code';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileSettingsStore {
  private dbService = inject(DbService);
  private snackbar = inject(SnackbarService);
  private settings = signal<UserProfileSettings | undefined>(undefined);

  private loadSettingsRequest = new Subject<void>();
  private setDefaultCurrencyRequest = new Subject<{ currency: CurrencyCode }>();

  public defaultCurrency = computed((): CurrencyCode => {
    const settings = this.settings();
    return settings?.defaultCurrency ?? 'UAH';
  });

  public isSettingsLoading = signal(false);
  public settingsErrorMessage = signal<string | undefined>(undefined);

  public isSetDefaultCurrencyLoading = signal(false);
  public setDefaultCurrencyErrorMessage = signal<string | undefined>(undefined);

  private onLoadSettingsRequest: Observable<undefined> = this.loadSettingsRequest.pipe(
    tap(() => this.isSettingsLoading.set(true)),
    switchMap(() => {
      return this.dbService.getUserProfileSettings().pipe(
        tap((settings) => {
          this.settings.set(settings);
          this.isSettingsLoading.set(false);
        }),
        map(() => undefined),
        catchError((error) => {
          this.settingsErrorMessage.set(error?.message || 'Failed to load user profile settings');
          this.isSettingsLoading.set(false);
          return of(undefined);
        }),
      );
    }),
  );

  private onSetDefaultCurrencyRequest: Observable<undefined> = this.setDefaultCurrencyRequest.pipe(
    tap(() => this.isSetDefaultCurrencyLoading.set(true)),
    switchMap(({ currency }) => {
      return this.dbService.setDefaultCurrency(currency).pipe(
        tap((settings) => {
          this.settings.set(settings);
          this.isSetDefaultCurrencyLoading.set(false);
          this.snackbar.success('Currency updated successfully');
        }),
        map(() => undefined),
        catchError((error) => {
          this.setDefaultCurrencyErrorMessage.set(
            error?.message || 'Failed to update default currency',
          );
          this.isSetDefaultCurrencyLoading.set(false);
          return of(undefined);
        }),
      );
    }),
  );

  constructor() {
    this.onLoadSettingsRequest.subscribe();
    this.onSetDefaultCurrencyRequest.subscribe();
  }

  public loadSettings(): void {
    this.loadSettingsRequest.next();
  }

  public setDefaultCurrency(currency: CurrencyCode): void {
    this.setDefaultCurrencyRequest.next({ currency });
  }
}
