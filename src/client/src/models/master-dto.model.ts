import { BaseDto } from "./base-dto.model";

export class MasterDto extends BaseDto {
  public active!: boolean;
  public insertedAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;
  public updatedBy!: Date;
}
