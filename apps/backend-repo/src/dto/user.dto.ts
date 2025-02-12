import { IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class ReqGetUserListDTO {
  @IsOptional()
  sort?: string = "name";

  @IsOptional()
  order?: string = "ASC";

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit: number = 5;
}
