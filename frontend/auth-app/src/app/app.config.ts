import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { environment } from "environments/environment";
import { provideEnvironmentNgxMask } from 'ngx-mask';

import { tokenGetter } from './shared/utils';
import { JwtModule } from '@auth0/angular-jwt';
import { authInterceptor } from "./shared/interceptors/auth.interceptor";
import { tokenInterceptor } from "./shared/interceptors/token.interceptor";
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { DatePipe } from "@angular/common";
import { APP_DATE_FORMATS } from "./shared/constants/globalDateFormat";

export const appConfig: ApplicationConfig = {
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS
    },

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor, tokenInterceptor])),
    // provideHttpClient(withInterceptors([loaderInterceptor])),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: environment.routeWithAuth,
          disallowedRoutes: environment.routeWithoutAuth
        }
      })
    ),
    provideEnvironmentNgxMask()
  ]
};
