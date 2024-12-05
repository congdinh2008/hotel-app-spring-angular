import { InjectionToken } from '@angular/core';
import { IHotelServiceService } from '../services/hotel-service/hotel-service.interface';
import { IRoomService } from '../services/room/room-service.interface';
import { IRoleService } from '../services/role/role-service.interface';

export const HOTEL_SERVICE_SERVICE = new InjectionToken<IHotelServiceService>(
  'HOTEL_SERVICE_SERVICE'
);

export const ROOM_SERVICE = new InjectionToken<IRoomService>('ROOM_SERVICE');

export const ROLE_SERVICE = new InjectionToken<IRoleService>('ROLE_SERVICE');
