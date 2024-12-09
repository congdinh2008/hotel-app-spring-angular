import { MasterDto } from '../master-dto.model';

export class UserMasterDto extends MasterDto {
  public firstName!: string;
  public lastName!: string;
  public username!: string;
  public email!: string;
  public phoneNumber!: string;
}
