import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import '@angular/common/locales/global/uk';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
