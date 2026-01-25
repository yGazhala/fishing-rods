import { inject, Injectable, signal } from '@angular/core';
import { DbService } from '../../../../database/db-service';
import { catchError, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { Rod } from '../../../../types/rod';
import { RodListParams } from '../../../../types/rod-list-params';

@Injectable()
export class RodListStore {
  private dbService = inject(DbService);

  public items = signal<Rod[] | undefined>(undefined);
  public isItemsLoading = signal(false);
  public errorMessage = signal<string | undefined>(undefined);

  private loadItemsRequest = new Subject<RodListParams>();

  private onLoadItems: Observable<undefined> = this.loadItemsRequest.pipe(
    tap(() => this.isItemsLoading.set(true)),
    switchMap((params) => {
      return this.dbService.getRods(params).pipe(
        tap((rods) => {
          this.items.set(rods);
          this.isItemsLoading.set(false);
        }),
        map(() => undefined),
        catchError((error) => {
          this.errorMessage.set(error?.message || 'Failed to load rods');
          this.isItemsLoading.set(false);
          return of(undefined);
        }),
      );
    }),
  );

  constructor() {
    this.onLoadItems.subscribe();
  }

  public loadItems(params: RodListParams): void {
    this.loadItemsRequest.next(params);
  }
}
