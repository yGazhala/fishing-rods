import { Routes } from '@angular/router';
import { AppDataBackup } from './core/containers/app-data-backup/app-data-backup';
import { RodList } from './features/rods/containers/rod-list/rod-list';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RodList,
  },
  {
    path: 'backup',
    component: AppDataBackup,
  },
];
