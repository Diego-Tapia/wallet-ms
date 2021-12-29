import { FilterQuery } from 'mongoose';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionModel } from '../models/transaction.model';

export interface ITransactionRepository {
  findAll(fillter?: FilterQuery<TransactionModel>, paths?: Array<{ path: string }> | null): Promise<Transaction[]>;
  findById(id: string, paths?: Array<{ path: string }> | null): Promise<Transaction>;
}