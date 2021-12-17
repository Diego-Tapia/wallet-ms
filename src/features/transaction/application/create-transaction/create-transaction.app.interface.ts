import { Request } from 'express';
import { CreateTransactionDto } from '../../infrastructure/dtos/create-transaction.dto';

export interface ICreateTransactionApplication {
  execute(createTransactionDto: CreateTransactionDto,request:Request): Promise<any>
}
