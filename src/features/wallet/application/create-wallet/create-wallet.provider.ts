import { WalletTypes } from '../../wallet.type';
import { CreateWalletApplication } from './create-wallet.application';

export const CreateTransactionApplicationProvider = {
  provide: WalletTypes.APPLICATION.CREATE_WALLET,
  useClass: CreateWalletApplication,
};
