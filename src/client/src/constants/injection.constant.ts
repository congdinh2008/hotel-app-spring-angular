import { InjectionToken } from '@angular/core';
import { IHotelServiceService } from '../services/hotel-service/hotel-service.interface';
import { IRoomService } from '../services/room/room-service.interface';
import { IRoleService } from '../services/role/role-service.interface';
import { IUserService } from '../services/user/user-service.interface';
import { IAuthService } from '../services/auth/auth-service.interface';
import { IPermissionsService } from '../services/permission/permissions-service.interface';

export const HOTEL_SERVICE_SERVICE = new InjectionToken<IHotelServiceService>(
  'HOTEL_SERVICE_SERVICE'
);

export const ROOM_SERVICE = new InjectionToken<IRoomService>('ROOM_SERVICE');

export const ROLE_SERVICE = new InjectionToken<IRoleService>('ROLE_SERVICE');

export const USER_SERVICE = new InjectionToken<IUserService>('USER_SERVICE');
export const AUTH_SERVICE = new InjectionToken<IAuthService>('AUTH_SERVICE');
export const PERMISSIONS_SERVICE = new InjectionToken<IPermissionsService>(
  'PERMISSIONS_SERVICE'
);
