import { Routes } from '@angular/router';
import { CustomerLayoutComponent } from './shared/layouts/customer-layout/customer-layout.component';
import { ManagerLayoutComponent } from './shared/layouts/manager-layout/manager-layout.component';
import { AnonymousLayoutComponent } from './shared/layouts/anonymous-layout/anonymous-layout.component';
import { AuthGuard } from '../guards/authclass.guard';
import { canActivateTeam } from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: 'errors',
    component: CustomerLayoutComponent,
    loadChildren: () =>
      import('./errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: 'auth',
    component: AnonymousLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'manager',
    component: ManagerLayoutComponent,
    canActivate: [canActivateTeam],
    loadChildren: () =>
      import('./manager/manager.module').then((m) => m.ManagerModule),
  },
  {
    path: '',
    component: CustomerLayoutComponent,
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
  },
];
