import { InjectionToken } from '@angular/core';
import { IHotelServiceService } from '../services/hotel-service.interface';
import { IRoomService } from '../services/room-service.interface';

export const HOTEL_SERVICE_SERVICE = new InjectionToken<IHotelServiceService>(
  'HOTEL_SERVICE_SERVICE'
);

export const ROOM_SERVICE = new InjectionToken<IRoomService>('ROOM_SERVICE');
