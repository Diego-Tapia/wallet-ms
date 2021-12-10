import { Transaction } from '../../domain/entities/transaction.entity';

export interface ITransactionRepository {
  findAll(fillter: IIdWalletFilter): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction>;
}

export interface IIdWalletFilter {
  walletFrom?: string;
  walletTo?: string;
}