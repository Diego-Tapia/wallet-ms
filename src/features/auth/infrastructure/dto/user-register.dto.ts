import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsNumber,
  IsMongoId,
} from 'class-validator';
export class UserRegisterDTO {
  
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  dni: number;

  @IsString()
  @IsNotEmpty()
  shortName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  cuil: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  phoneNumber: number;

  @IsString()
  @IsNotEmpty()
  avatar_url: string;

  @IsString()
  @IsNotEmpty()
  custom_id: string;

  @IsMongoId()
  @IsNotEmpty()
  client_id: string;

}
