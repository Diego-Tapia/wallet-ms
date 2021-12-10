import { TransactionTypes } from '../../transaction.types';
import { GetAllTransactionsApplication } from "./get-all-transactions.application";

export const GetAllTransactionsApplicationProvider = {
  provide: TransactionTypes.APPLICATION.GET_ALL_TRANSACTIONS,
  useClass: GetAllTransactionsApplication,
};
