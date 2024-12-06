import {APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {errorInterceptor} from './core/interceptors/error.interceptor';
import {lastValueFrom} from 'rxjs';
import {InitService} from './core/services/init.service';

function initializeApp(initService: InitService){
  return () => lastValueFrom(initService.init()).finally(()=>{
    const splash = document.getElementById('splash');
    if(splash)
      splash.remove();
  })
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([errorInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [InitService],
      multi: true
    }]
};
