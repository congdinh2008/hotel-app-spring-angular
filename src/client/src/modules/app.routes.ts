import { Routes } from '@angular/router';
import { CustomerLayoutComponent } from './shared/layouts/customer-layout/customer-layout.component';
import { ManagerLayoutComponent } from './shared/layouts/manager-layout/manager-layout.component';
import { AnonymousLayoutComponent } from './shared/layouts/anonymous-layout/anonymous-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AnonymousLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'manager',
    component: ManagerLayoutComponent,
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
