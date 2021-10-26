import { Transaction } from '../../domain/entities/transaction.entity';

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
  findAll(fillter: IIdWalletFilter): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction>;
}

export interface IIdWalletFilter {
  walletFrom?: string;
  walletTo?: string;
}