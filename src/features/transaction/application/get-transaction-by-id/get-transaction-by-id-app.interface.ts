import { Transaction } from '../../domain/entities/transaction.entity';

export interface IGetTransactionByIdApplication {
  execute(id: string): Promise<Transaction>;
}
