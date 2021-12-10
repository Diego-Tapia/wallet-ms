import { IsString, IsNotEmpty } from 'class-validator';

export class UserConfirmDTO {
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @IsString()
  @IsNotEmpty()
  public readonly confirmCode: string;
}
