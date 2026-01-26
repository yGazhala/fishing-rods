import { ActivatedRoute, QueryParamsHandling } from '@angular/router';

export abstract class RouterService<RouteData = unknown> {
  public static path: string;

  public abstract navigate(
    data: RouteData,
    replaceUrl: boolean,
    queryParamsHandling: QueryParamsHandling,
  ): Promise<boolean>;

  public abstract composeRouterLink(data: RouteData): string;

  public abstract getRouteData(activatedRoute: ActivatedRoute): RouteData;
}
