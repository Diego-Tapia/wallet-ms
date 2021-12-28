import { FilterQuery } from 'mongoose';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionModel } from '../models/transaction.model';

export interface ITransactionRepository {
  findAll(fillter?: FilterQuery<TransactionModel>): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction>;
}