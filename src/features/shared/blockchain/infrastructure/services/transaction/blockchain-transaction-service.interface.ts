import { Observable } from "rxjs";
import { Transaction } from "src/features/transaction/domain/entities/transaction.entity";

export interface IBlockchainTransactionService {
    create(transaction: Transaction): Observable<Transaction>;
}
