import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsMongoId, IsNumber } from 'class-validator';

export class CreateTransactionDto {

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  public readonly dniFrom: number;

  @IsMongoId()
  @IsNotEmpty()
  public readonly Token: string;


  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  public readonly amount: number;

}
