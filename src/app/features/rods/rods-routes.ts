import { Routes } from '@angular/router';
import { rodsRoutePath } from './rods-route-path';
import { RodsRoot } from './containers/rods-root/rods-root';
import { RodList } from './containers/rod-list/rod-list';
import { RodDetailsRouterService } from './services/rod-details-router.service';
import { RodDetails } from './containers/rod-details/rod-details';
import { RodListRouterService } from './services/rod-list-router.service';
import { OfferListRouterService } from './services/offer-list.router-service';
import { OfferList } from './containers/offer-list/offer-list';
import { AddOfferRouterService } from './services/add-offer.router-service';
import { AddOffer } from './containers/add-offer/add-offer';

export const rodsRoutes: Routes = [
  {
    path: rodsRoutePath,
    component: RodsRoot,
    children: [
      {
        path: RodListRouterService.path,
        pathMatch: 'full',
        component: RodList,
      },
      {
        path: RodDetailsRouterService.path,
        component: RodDetails,
      },
      {
        path: OfferListRouterService.path,
        component: OfferList,
      },
      {
        path: AddOfferRouterService.path,
        component: AddOffer,
      },
    ],
  },
];
