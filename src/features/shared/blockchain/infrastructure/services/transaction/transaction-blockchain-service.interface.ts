import { Transaction } from "src/features/transaction/domain/entities/transaction.entity";

export interface ITransactionBlockchainService {
    create(transaction: Transaction):Promise<Transaction>
}
