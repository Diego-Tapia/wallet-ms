import { Type } from 'class-transformer';
import { IsNotEmpty, IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {

  @IsMongoId()
  @IsNotEmpty()
  public readonly token: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  public readonly amount: number;

  @IsString()
  @IsNotEmpty()
  public readonly notes: string;

  @IsString()
  @IsNotEmpty()
  public readonly userIdentifier: string;
}
