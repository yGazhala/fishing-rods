import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, QueryParamsHandling, Router } from '@angular/router';
import { RouterService } from '../../../types/router-service';
import { rodsRoutePath } from '../rods-route-path';

export type AddOfferRouteData = {
  rodId: string;
  goBackText?: string;
};

const pathSegmentName = 'add-offer';

@Injectable({
  providedIn: 'root',
})
export class AddOfferRouterService extends RouterService<AddOfferRouteData> {
  private router = inject(Router);

  public static override path = `${pathSegmentName}/:rodId`;

  public getRouteData(activatedRoute: ActivatedRoute): AddOfferRouteData {
    return {
      rodId: activatedRoute.snapshot.params['rodId'],
      goBackText: activatedRoute.snapshot.queryParams['goBackText'],
    };
  }

  public composeRouterLink(data: AddOfferRouteData): string {
    return `/${rodsRoutePath}/${pathSegmentName}/${data.rodId}`;
  }

  public navigate(
    data: AddOfferRouteData,
    replaceUrl = false,
    queryParamsHandling: QueryParamsHandling = 'merge',
  ): Promise<boolean> {
    const extras: NavigationExtras = {
      replaceUrl,
      queryParamsHandling,
      queryParams: {
        goBackText: data.goBackText,
      },
    };

    return this.router.navigate([`/${rodsRoutePath}`, pathSegmentName, data.rodId], extras);
  }
}
