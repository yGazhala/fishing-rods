import { Injectable, inject } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { concatMap, forkJoin, map, Observable } from 'rxjs';
import { DbStoreName } from './db-store-name';
import { DbData } from '../types/db-data';
import { Brand } from '../types/brand';
import { RodType } from '../types/rod-type';
import { Rod } from '../types/rod';
import { Offer } from '../types/offer';
import { RodListParams } from '../types/rod-list-params';
import { UserProfileSettings } from '../types/user-profile-settings';
import { CurrencyCode } from '../types/currency-code';
import { NewOffer } from '../types/new-offer';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private db = inject(NgxIndexedDBService);
  private currentUserId = 'current_user';

  public getAppData(): Observable<DbData> {
    return forkJoin([
      this.db.getAll<Brand>(DbStoreName.BRANDS),
      this.db.getAll<RodType>(DbStoreName.ROD_TYPES),
      this.db.getAll<Rod>(DbStoreName.RODS),
      this.db.getAll<Offer>(DbStoreName.OFFERS),
      this.db.getAll<UserProfileSettings>(DbStoreName.USER_PROFILE_SETTINGS),
    ]).pipe(
      map(([brands, rodTypes, rods, offers, userProfileSettings]) => {
        return {
          brands,
          rodTypes,
          rods,
          offers,
          userProfileSettings,
        };
      }),
    );
  }

  public setAppData(data: DbData): Observable<void> {
    return this.clearAppData().pipe(concatMap(() => this.putAppData(data)));
  }

  public getRods(params: RodListParams): Observable<Rod[]> {
    // from <= value <= to
    const maxLureWeightRange = IDBKeyRange.bound(
      params.maxLureWeightGrams?.from ?? 0,
      params.maxLureWeightGrams?.to ?? Number.MAX_SAFE_INTEGER,
    );

    return this.db
      .getAllByIndex<Rod>(DbStoreName.RODS, 'maxLureWeightGrams', maxLureWeightRange)
      .pipe(
        map((rods) => {
          if (!params.onlyFavorites && !params.typeId) {
            return rods;
          }

          return rods.filter((rod: Rod) => {
            let isMatched = true;
            if (params.onlyFavorites) {
              isMatched = rod.isFavorite;
            }
            if (params.typeId) {
              isMatched = isMatched && rod.typeId === params.typeId;
            }
            return isMatched;
          });
        }),
        map((rods) => rods.sort((a, b) => a.searchIndex.localeCompare(b.searchIndex))),
      );
  }

  public getRodById(rodId: string): Observable<Rod | undefined> {
    return this.db.getByKey<Rod>(DbStoreName.RODS, rodId);
  }

  public getBrands(): Observable<Brand[]> {
    return this.db.getAll<Brand>(DbStoreName.BRANDS);
  }

  public getRodTypes(): Observable<RodType[]> {
    return this.db.getAll<RodType>(DbStoreName.ROD_TYPES);
  }

  /**
   * Returns all offers for the rod sorted by timestamp in descending order (newest first)
   */
  public getOffersByRodDescending(rodId: string): Observable<Offer[]> {
    return this.db
      .getAllByIndex<Offer>(DbStoreName.OFFERS, 'rodId', IDBKeyRange.only(rodId))
      .pipe(map((items) => items.sort((a, b) => b.timestamp - a.timestamp)));
  }

  public addOffer(newOffer: NewOffer): Observable<{ id: number }> {
    return this.db.add(DbStoreName.OFFERS, newOffer).pipe(
      map((offer) => {
        return { id: offer.id };
      }),
    );
  }

  public getUserProfileSettings(): Observable<UserProfileSettings> {
    return this.db.getByKey<UserProfileSettings>(
      DbStoreName.USER_PROFILE_SETTINGS,
      this.currentUserId,
    );
  }

  public setDefaultCurrency(currency: CurrencyCode): Observable<UserProfileSettings> {
    return this.getUserProfileSettings().pipe(
      concatMap((existingSettings) => {
        const newSettings: UserProfileSettings = {
          ...existingSettings,
          defaultCurrency: currency,
        };
        return this.db.update<UserProfileSettings>(DbStoreName.USER_PROFILE_SETTINGS, newSettings);
      }),
    );
  }

  private clearAppData(): Observable<void> {
    return forkJoin([
      this.db.clear(DbStoreName.USER_PROFILE_SETTINGS),
      this.db.clear(DbStoreName.BRANDS),
      this.db.clear(DbStoreName.ROD_TYPES),
      this.db.clear(DbStoreName.RODS),
      this.db.clear(DbStoreName.OFFERS),
    ]).pipe(map(() => undefined));
  }

  /**
   * Adds new or updates the existing records in all app stores
   */
  private putAppData(data: DbData): Observable<void> {
    const operations: Observable<unknown>[] = [];
    if (data?.userProfileSettings?.length) {
      operations.push(this.db.bulkPut(DbStoreName.USER_PROFILE_SETTINGS, data.userProfileSettings));
    }
    if (data?.brands?.length) {
      operations.push(this.db.bulkPut(DbStoreName.BRANDS, data.brands));
    }
    if (data?.rodTypes?.length) {
      operations.push(this.db.bulkPut(DbStoreName.ROD_TYPES, data.rodTypes));
    }
    if (data?.rods?.length) {
      operations.push(this.db.bulkPut(DbStoreName.RODS, data.rods));
    }
    if (data?.offers?.length) {
      operations.push(this.db.bulkPut(DbStoreName.OFFERS, data.offers));
    }
    return forkJoin(operations).pipe(map(() => undefined));
  }
}
