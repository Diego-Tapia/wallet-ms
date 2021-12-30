import { FilterQuery, PopulateOptions } from 'mongoose';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionModel } from '../models/transaction.model';

export interface ITransactionRepository {
  findAll(fillter?: FilterQuery<TransactionModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Transaction[]>;
  findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<Transaction>;
}