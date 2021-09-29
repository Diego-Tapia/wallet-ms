import { Transaction } from '../../domain/entities/transaction.entity';

export interface IGetAllTransactionsApplication {
  execute(): Promise<Transaction[]>;
}
