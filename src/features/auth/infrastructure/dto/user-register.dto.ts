import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsNumber,
} from 'class-validator';
export class UserRegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  public readonly password: string;

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
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  avatarUrl: string;

}
