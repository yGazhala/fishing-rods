import { Injectable, inject } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { concatMap, forkJoin, map, Observable } from 'rxjs';
import { DbStoreName } from './db-store-name';
import { DbData } from '../types/db-data';
import { Brand } from '../types/brand';
import { RodType } from '../types/rod-type';
import { Rod } from '../types/rod';
import { Advertisement } from '../types/advertisement';
import { RodListParams } from '../types/rod-list-params';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private db = inject(NgxIndexedDBService);

  public getAppData(): Observable<DbData> {
    return forkJoin([
      this.db.getAll<Brand>(DbStoreName.BRANDS),
      this.db.getAll<RodType>(DbStoreName.ROD_TYPES),
      this.db.getAll<Rod>(DbStoreName.RODS),
      this.db.getAll<Advertisement>(DbStoreName.ADVERTISEMENTS),
    ]).pipe(
      map(([brands, rodTypes, rods, advertisements]) => {
        return {
          brands,
          rodTypes,
          rods,
          advertisements,
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

  private clearAppData(): Observable<void> {
    return forkJoin([
      this.db.clear(DbStoreName.BRANDS),
      this.db.clear(DbStoreName.ROD_TYPES),
      this.db.clear(DbStoreName.RODS),
      this.db.clear(DbStoreName.ADVERTISEMENTS),
    ]).pipe(map(() => undefined));
  }

  /**
   * Adds new or updates the existing records in all app stores
   */
  private putAppData(data: DbData): Observable<void> {
    const operations: Observable<unknown>[] = [];
    if (data?.brands?.length) {
      operations.push(this.db.bulkPut(DbStoreName.BRANDS, data.brands));
    }
    if (data?.rodTypes?.length) {
      operations.push(this.db.bulkPut(DbStoreName.ROD_TYPES, data.rodTypes));
    }
    if (data?.rods?.length) {
      operations.push(this.db.bulkPut(DbStoreName.RODS, data.rods));
    }
    if (data?.advertisements?.length) {
      operations.push(this.db.bulkPut(DbStoreName.ADVERTISEMENTS, data.advertisements));
    }
    return forkJoin(operations).pipe(map(() => undefined));
  }
}
