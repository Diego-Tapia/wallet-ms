import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsPositive,
  MaxLength,
  ValidateIf,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Applicabilities } from 'src/features/appicability/domain/entities/applicabilities.entity';
import { TransactionType } from 'src/features/transaction_type/domain/entities/transactionType.entity';
export class CreateTokenDto {

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  public readonly shortName: string;

  @IsString()
  @MaxLength(5)
  @IsNotEmpty()
  public readonly symbol: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public readonly price: number;

  @IsString()
  @IsNotEmpty()
  public readonly money: string;

  @IsString()
  public readonly bcItemId: string

  @IsArray()
  public readonly operations: Array<TransactionType>

  @IsArray()
  public readonly applicabilities: Array<Applicabilities>

  @IsOptional()
  @IsString()
  public readonly description: string;

  @IsOptional()
  @IsDateString()
  public readonly validFrom: Date;

  @IsDateString()
  @ValidateIf((params) => !!params.validFrom)
  public readonly validTo: Date;
 
}
