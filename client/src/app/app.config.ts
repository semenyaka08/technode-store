import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {errorInterceptor} from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withComponentInputBinding()), provideAnimationsAsync(), provideHttpClient(withInterceptors([errorInterceptor]))]
};
