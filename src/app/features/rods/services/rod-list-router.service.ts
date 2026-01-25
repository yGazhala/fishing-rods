import { inject, Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationExtras,
  QueryParamsHandling,
  Router,
} from '@angular/router';
import { RodListParams } from '../../../types/rod-list-params';

type RodListQueryParams = {
  onlyFavorites?: 'true';
  typeId?: string;
  maxLureWeightFrom?: string;
  maxLureWeightTo?: string;
};

@Injectable({
  providedIn: 'root',
})
export class RodListRouterService {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  public getParams(): RodListParams {
    const snapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
    const queryParams: RodListQueryParams = snapshot.queryParams;

    const result: RodListParams = {
      onlyFavorites: queryParams.onlyFavorites === 'true',
      typeId: queryParams.typeId ?? undefined,
      maxLureWeightGrams: undefined,
    };
    if (typeof queryParams.maxLureWeightFrom === 'string') {
      result.maxLureWeightGrams = {
        from: Number(queryParams.maxLureWeightFrom),
      };
      if (typeof queryParams.maxLureWeightTo === 'string') {
        result.maxLureWeightGrams.to = Number(queryParams.maxLureWeightTo);
      }
    }

    return result;
  }

  public navigate(
    params?: RodListParams,
    replaceUrl = false,
    queryParamsHandling: QueryParamsHandling = 'merge',
  ): Promise<boolean> {
    const extras: NavigationExtras = {
      replaceUrl,
      queryParamsHandling,
    };

    if (params) {
      extras.queryParams = {
        onlyFavorites: params.onlyFavorites ? 'true' : undefined,
        typeId: params.typeId ?? undefined,
        maxLureWeightFrom: params.maxLureWeightGrams?.from ?? undefined,
        maxLureWeightTo: params.maxLureWeightGrams?.to ?? undefined,
      };
    }

    return this.router.navigate(['/'], extras);
  }
}
