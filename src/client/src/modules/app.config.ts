import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { authInterceptor } from '../interceptors/auth.interceptor';
import { errorInterceptor } from '../interceptors/error.interceptor';
import { AUTH_SERVICE, PERMISSIONS_SERVICE } from '../constants/injection.constant';
import { AuthGuard } from '../guards/authclass.guard';
import { PermissionsService } from '../services/permission/permissions.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([errorInterceptor, authInterceptor]),
      withFetch()
    ),
    importProvidersFrom(AuthGuard),
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: PERMISSIONS_SERVICE,
      useClass: PermissionsService,
    }
  ],
};
