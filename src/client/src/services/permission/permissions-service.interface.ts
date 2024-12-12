export interface IPermissionsService {
  canActivate(): boolean;
  isUnauthenticated(): boolean;
}
