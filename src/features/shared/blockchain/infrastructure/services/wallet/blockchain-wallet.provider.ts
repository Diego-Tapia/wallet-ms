import { BlockchainTypes } from "../../../blockchain.type";
import { BlockchainWalletService } from "./blockchain-wallet.service";

export const BlockchainWalletServiceProvider = {
  provide: BlockchainTypes.INFRASTRUCTURE.WALLET,
  useClass: BlockchainWalletService
};
