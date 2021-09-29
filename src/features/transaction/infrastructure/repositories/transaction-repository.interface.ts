import { Transaction } from '../../domain/entities/transaction.entity';

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
  findAll(): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction>;
}
