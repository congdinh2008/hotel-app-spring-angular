import { Injectable } from '@angular/core';
import { IHotelServiceService } from './hotel-service.interface';
import { HttpClient } from '@angular/common/http';
import { MasterService } from '../master.service';

@Injectable()
export class HotelServiceService
  extends MasterService
  implements IHotelServiceService
{
  constructor(public override httpClient: HttpClient) {
    super('hotel-services', httpClient);
  }
}
