import { BlockchainTypes } from "../../../blockchain.types";
import { TransactionBlockchainService } from "./transaction-blockchain.service";

export const TransactionBlockchainServiceProvider = {
    provide: BlockchainTypes.INFRASTRUCTURE.TRANSACTION,
    useClass: TransactionBlockchainService,
};