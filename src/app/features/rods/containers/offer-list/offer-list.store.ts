import { inject, Injectable, signal } from '@angular/core';
import { DbService } from '../../../../database/db-service';
import { catchError, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { Offer } from '../../../../types/offer';
import { SnackbarService } from '../../../../core/services/snackbar.service';

@Injectable()
export class OfferListStore {
  private dbService = inject(DbService);
  private snackbar = inject(SnackbarService);

  public offers = signal<Offer[] | undefined>(undefined);
  public isOffersLoading = signal(false);
  public errorMessage = signal<string | undefined>(undefined);
  public isRemoveOfferLoading = signal(false);

  private loadOffersRequest = new Subject<{ rodId: string }>();
  private removeOfferRequest = new Subject<{ offerId: number }>();

  private onLoadItems: Observable<undefined> = this.loadOffersRequest.pipe(
    tap(() => this.isOffersLoading.set(true)),
    switchMap(({ rodId }) => {
      return this.dbService.getOffersByRodDescending(rodId).pipe(
        tap((rods) => {
          this.offers.set(rods);
          this.isOffersLoading.set(false);
        }),
        map(() => undefined),
        catchError((error) => {
          const message = error?.message || 'Failed to load offers';
          console.error(message);
          this.errorMessage.set(message);
          this.isOffersLoading.set(false);
          return of(undefined);
        }),
      );
    }),
  );

  private onRemoveOffer: Observable<undefined> = this.removeOfferRequest.pipe(
    tap(() => this.isRemoveOfferLoading.set(true)),
    switchMap(({ offerId }) => {
      return this.dbService.removeOffer(offerId).pipe(
        tap(() => {
          const offers = this.offers() ?? [];
          const updatedOffers = offers.filter((offer) => offer.id !== offerId);
          this.offers.set(updatedOffers);
          this.isOffersLoading.set(false);
          this.snackbar.success('Offer deleted');
        }),
        map(() => undefined),
        catchError((error) => {
          console.error(error);
          this.snackbar.error('Failed to delete offer');
          this.isRemoveOfferLoading.set(false);
          return of(undefined);
        }),
      );
    }),
  );

  constructor() {
    this.onLoadItems.subscribe();
    this.onRemoveOffer.subscribe();
  }

  public loadOffers(rodId: string): void {
    this.loadOffersRequest.next({ rodId });
  }

  public removeOffer(offerId: number): void {
    this.removeOfferRequest.next({ offerId });
  }
}
