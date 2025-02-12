import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { Transform } from "class-transformer";
import { User } from "../entities/user";
import { GenderEnum } from "@repo/interfaces/user";

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

export class CreateUserDTO implements Partial<User> {
  username: string;
  email: string;
  fullname: string;
  password: string;
  profile_picture: string;
  age: number;
  gender: GenderEnum;
  address: string;
  created_at: Date;
  created_by: string;
  totalAverageWeightRatings: Float32Array;
  numberOfRents: number;
  recentlyActive: number;
}

export class UpdateUserDTO implements Partial<User> {
  @IsNotEmpty({ message: "Nama harus diisi." })
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsString()
  profile_picture?: string;

  @IsOptional()
  @IsString()
  age?: number;

  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @IsOptional()
  @IsString()
  address?: string;

  updated_at: Date = new Date();

  updated_by: string = "admin";

  totalAverageWeightRatings: Float32Array;
  numberOfRents: number;
  recentlyActive: number;
}
