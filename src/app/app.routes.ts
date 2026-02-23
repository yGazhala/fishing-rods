import { Routes } from '@angular/router';
import { UserProfileSettings } from './core/containers/user-profile-settings/user-profile-settings';
import { rodsRoutes } from './features/rods/rods-routes';
import { PageNotFound } from './core/containers/page-not-found/page-not-found';

export const routes: Routes = [
  {
    path: 'settings',
    component: UserProfileSettings,
  },
  ...rodsRoutes,
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'rods',
  },
  {
    path: '**',
    component: PageNotFound,
  },
];
