import { MasterDto } from '../master-dto.model';

export class RoomMasterDto extends MasterDto {
  public number!: string;
  public price!: number;
  public capacity!: number;
  public type!: string;
}
