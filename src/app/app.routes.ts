import { Routes } from '@angular/router';
import { AppDataBackup } from './core/containers/app-data-backup/app-data-backup';
import { RodList } from './features/rods/containers/rod-list/rod-list';
import { RodsRoot } from './features/rods/containers/rods-root/rods-root';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RodsRoot,
    children: [
      {
        path: '',
        component: RodList,
      },
    ],
  },
  {
    path: 'backup',
    component: AppDataBackup,
  },
];
