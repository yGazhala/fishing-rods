import { Injectable, inject } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { concatMap, forkJoin, map, Observable } from 'rxjs';
import { DbStoreName } from './db-store-name';
import { DbData } from '../types/db-data';
import { Brand } from '../types/brand';
import { RodType } from '../types/rod-type';
import { Rod } from '../types/rod';
import { Advertisement } from '../types/advertisement';

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
