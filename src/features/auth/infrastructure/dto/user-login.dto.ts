import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UserLoginDTO {
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  public readonly password: string;
}
