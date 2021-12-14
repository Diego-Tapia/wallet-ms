import { Transaction } from "src/features/transaction/domain/entities/transaction.entity";

export interface IQueueEmitterTransactionApplication {
  execute(message: Transaction): void
}
