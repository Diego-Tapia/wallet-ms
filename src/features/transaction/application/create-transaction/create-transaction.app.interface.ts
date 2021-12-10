import { Request } from 'express';
import { IApiResponse } from 'src/features/shared/interfaces/api-response.interface';
import { Transaction } from '../../domain/entities/transaction.entity';
import { CreateTransactionDto } from '../../infrastructure/dtos/create-transaction.dto';

export interface ICreateTransactionApplication {
  execute(createTransactionDto: CreateTransactionDto,request:Request): Promise<IApiResponse<Transaction>>;
}
