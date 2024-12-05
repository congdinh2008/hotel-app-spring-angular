import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoomListComponent } from './room/room-list.component';
import { HotelServiceListComponent } from './hotel-service/hotel-service-list.component';
import { HotelServiceService } from '../../services/hotel-service/hotel-service.service';
import { HOTEL_SERVICE_SERVICE, ROLE_SERVICE, ROOM_SERVICE } from '../../constants/injection.constant';
import { RoomService } from '../../services/room/room.service';
import { RoleService } from '../../services/role/role.service';
import { RoleListComponent } from './role/role-list.component';

const routes: Routes = [
  {
    path: 'rooms',
    component: RoomListComponent,
  },
  {
    path: 'roles',
    component: RoleListComponent,
  },
  {
    path: 'hotel-services',
    component: HotelServiceListComponent,
  },
  {
    path: '**',
    redirectTo: 'rooms',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [
    {
      provide: HOTEL_SERVICE_SERVICE,
      useClass: HotelServiceService,
    },
    {
      provide: ROOM_SERVICE,
      useClass: RoomService,
    },
    {
      provide: ROLE_SERVICE,
      useClass: RoleService,
    },
  ],
})
export class ManagerModule {}
