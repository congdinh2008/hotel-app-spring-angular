import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { PERMISSIONS_SERVICE } from '../constants/injection.constant';

export const canActivateLogin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // Inject PermissionsService by IPermissionsService token
  const permissionsService = inject(PERMISSIONS_SERVICE);

  // Check if user is authenticated or not
  return permissionsService.isUnauthenticated();
};
