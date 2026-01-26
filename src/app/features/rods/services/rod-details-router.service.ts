import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, QueryParamsHandling, Router } from '@angular/router';
import { RouterService } from '../../../types/router-service';
import { rodsRoutePath } from '../rods-route-path';

export type RodDetailsRouteData = {
  rodId: string;
};

const pathSegmentName = 'details';

@Injectable({
  providedIn: 'root',
})
export class RodDetailsRouterService extends RouterService<RodDetailsRouteData> {
  private router = inject(Router);

  public static override path = `${pathSegmentName}/:rodId`;

  public getRouteData(activatedRoute: ActivatedRoute): RodDetailsRouteData {
    return activatedRoute.snapshot.params as RodDetailsRouteData;
  }

  public composeRouterLink(data: RodDetailsRouteData): string {
    return `/${rodsRoutePath}/${pathSegmentName}/${data.rodId}`;
  }

  public navigate(
    data: RodDetailsRouteData,
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
