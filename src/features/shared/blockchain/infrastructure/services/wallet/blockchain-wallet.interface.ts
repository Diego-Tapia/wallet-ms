import { Wallet } from "src/features/wallet/domain/entities/wallet.entity";

export interface IBlockhainWalletServices {
    findOne(wallet_id: string): Promise<Wallet>;
}