import { Wallet } from '../../domain/entities/wallet.entity';

export interface IWalletRepository {
  create(wallet: Wallet): Promise<Wallet>;
  findById(id: string, paths?: Array<{ path: string }> | null): Promise<Wallet>;
}
