import { Injectable } from '@angular/core';
import { IUserService } from './user-service.interface';
import { MasterService } from '../master.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService extends MasterService implements IUserService {
  constructor(protected override httpClient: HttpClient) {
    super('users', httpClient);
  }
}
