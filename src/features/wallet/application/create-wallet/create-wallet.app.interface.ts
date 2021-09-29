import { Wallet } from '../../domain/entities/wallet.entity';
import { CreateWalletDto } from '../../infrastructure/dtos/create-wallet.dto';

export interface ICreateWalletApplication {
  execute(createTransactionDto: CreateWalletDto): Promise<Wallet>;
}
