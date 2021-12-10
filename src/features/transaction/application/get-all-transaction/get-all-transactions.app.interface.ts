import { RequestModel } from 'src/features/auth/infrastructure/service/middleware/auth.middleware';
import { Transaction } from '../../domain/entities/transaction.entity';

export interface IGetAllTransactionsApplication {
  execute(req: RequestModel): Promise<Transaction[]>;
}
