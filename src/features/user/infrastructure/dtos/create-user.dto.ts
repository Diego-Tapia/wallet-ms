import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsNumber,
  IsEmail,
  IsPhoneNumber,
  IsInt,
} from 'class-validator';

export class CreateUserDto {
  @IsMongoId()
  @IsNotEmpty()
  idWallet: string;

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

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  username: string;

}
