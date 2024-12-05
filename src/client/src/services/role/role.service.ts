import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRoleService } from './role-service.interface';
import { MasterService } from '../master.service';

@Injectable()
export class RoleService extends MasterService implements IRoleService {
  constructor(public override httpClient: HttpClient) {
    super('roles', httpClient);
  }
}
