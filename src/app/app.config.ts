import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIndexedDb } from 'ngx-indexed-db';

import { routes } from './app.routes';
import { dbConfig } from './database/db-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideIndexedDb(dbConfig),
  ],
};
