import { ETransactionTypes } from "src/features/transaction_type/domain/enums/transaction-types.enum";

export interface ITransactionQueueMessage {
    transactionType: ETransactionTypes,
    token: string,
    amount: number,
    userId: string,
    walletFrom: string,
    walletTo: string,
    notes?: string,
}