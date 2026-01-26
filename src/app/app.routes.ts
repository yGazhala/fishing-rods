import { Routes } from '@angular/router';
import { AppDataBackup } from './core/containers/app-data-backup/app-data-backup';
import { rodsRoutes } from './features/rods/rods-routes';
import { PageNotFound } from './core/containers/page-not-found/page-not-found';

export const routes: Routes = [
  {
    path: 'backup',
    component: AppDataBackup,
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
