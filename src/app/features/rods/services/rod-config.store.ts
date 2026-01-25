import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { DbService } from '../../../database/db-service';
import { Brand } from '../../../types/brand';
import { RodType } from '../../../types/rod-type';
import { catchError, forkJoin, map, Observable, of, Subject, switchMap, tap } from 'rxjs';

@Injectable()
export class RodConfigStore {
  private dbService = inject(DbService);

  public isConfigLoading = signal(false);
  public configErrorMessage = signal<string | undefined>(undefined);

  public brands = signal<Brand[]>([]);
  public rodTypes = signal<RodType[]>([]);

  private loadConfigRequest = new Subject<void>();

  private onLoadConfig: Observable<undefined> = this.loadConfigRequest.pipe(
    tap(() => this.isConfigLoading.set(true)),
    switchMap(() => {
      return forkJoin([this.dbService.getBrands(), this.dbService.getRodTypes()]).pipe(
        tap(([brands, rodTypes]) => {
          this.brands.set(brands);
          this.rodTypes.set(rodTypes);
          this.isConfigLoading.set(false);
        }),
        map(() => undefined),
        catchError((error) => {
          this.configErrorMessage.set(error?.message || 'Failed to load config');
          this.isConfigLoading.set(false);
          return of(undefined);
        }),
      );
    }),
  );

  constructor() {
    this.onLoadConfig.subscribe();
  }

  public loadConfig(): void {
    this.loadConfigRequest.next();
  }

  public getBrandById(id: string): Signal<Brand | undefined> {
    return computed(() => {
      return this.brands().find((brand) => brand.id === id);
    });
  }

  public getRodTypeById(id: string): Signal<RodType | undefined> {
    return computed(() => {
      return this.rodTypes().find((rodType) => rodType.id === id);
    });
  }
}
