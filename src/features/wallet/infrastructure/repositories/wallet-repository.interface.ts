import { Wallet } from '../../domain/entities/wallet.entity';

export interface IWalletRepository {
  create(wallet: Wallet): Promise<Wallet>;
}
