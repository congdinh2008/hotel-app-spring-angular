import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRoomService } from './room-service.interface';
import { MasterService } from '../master.service';

@Injectable()
export class RoomService extends MasterService implements IRoomService {
  constructor(public override httpClient: HttpClient) {
    super('rooms', httpClient);
  }
}
