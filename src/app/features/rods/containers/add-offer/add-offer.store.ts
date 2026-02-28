import { inject, Injectable, signal } from '@angular/core';
import { DbService } from '../../../../database/db-service';
import { catchError, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { NewOffer } from '../../../../types/new-offer';
import { SnackbarService } from '../../../../core/services/snackbar.service';

@Injectable()
export class AddOfferStore {
  private dbService = inject(DbService);
  private snackbar = inject(SnackbarService);

  public isAddLoading = signal(false);

  private addRequest = new Subject<NewOffer>();

  private onAddRequest: Observable<undefined> = this.addRequest.pipe(
    tap(() => this.isAddLoading.set(true)),
    switchMap((offer) => {
      return this.dbService.addOffer(offer).pipe(
        tap(() => {
          this.snackbar.success('New offer added');
          this.isAddLoading.set(false);
          window.history.back();
        }),
        map(() => undefined),
        catchError((error) => {
          console.error(error);
          this.snackbar.error('Failed to add offer');
          this.isAddLoading.set(false);
          return of(undefined);
        }),
      );
    }),
  );

  constructor() {
    this.onAddRequest.subscribe();
  }

  public add(offer: NewOffer): void {
    this.addRequest.next(offer);
  }
}
