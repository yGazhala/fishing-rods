import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIndexedDb } from 'ngx-indexed-db';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { routes } from './app.routes';
import { dbConfig } from './database/db-config';
import { appLocale } from './utils/app-locale';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideIndexedDb(dbConfig),
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: appLocale },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
