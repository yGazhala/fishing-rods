import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, QueryParamsHandling, Router } from '@angular/router';
import { RouterService } from '../../../types/router-service';
import { rodsRoutePath } from '../rods-route-path';

export type OfferListRouteData = {
  rodId: string;
};

const pathSegmentName = 'offers';

@Injectable({
  providedIn: 'root',
})
export class OfferListRouterService extends RouterService<OfferListRouteData> {
  private router = inject(Router);

  public static override path = `${pathSegmentName}/:rodId`;

  public getRouteData(activatedRoute: ActivatedRoute): OfferListRouteData {
    return activatedRoute.snapshot.params as OfferListRouteData;
  }

  public composeRouterLink(data: OfferListRouteData): string {
    return `/${rodsRoutePath}/${pathSegmentName}/${data.rodId}`;
  }

  public navigate(
    data: OfferListRouteData,
    replaceUrl = false,
    queryParamsHandling: QueryParamsHandling = 'merge',
  ): Promise<boolean> {
    const extras: NavigationExtras = {
      replaceUrl,
      queryParamsHandling,
    };

    return this.router.navigate([`/${rodsRoutePath}`, pathSegmentName, data.rodId], extras);
  }
}
