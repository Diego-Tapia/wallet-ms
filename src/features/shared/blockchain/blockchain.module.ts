import { Module } from '@nestjs/common';
import { BlockchainTransactionServiceProvider } from './infrastructure/services/transaction/blockchain-transaction-service.provider';
import { BlockchainWalletServiceProvider } from './infrastructure/services/wallet/blockchain-wallet.provider';
import { AxiosProvider } from '../libaries/axios/axios.provider';
import { LibrarieModule } from '../libaries/librarie.module';

@Module({
    imports: [
        LibrarieModule
    ],
    providers: [
        BlockchainWalletServiceProvider,
        BlockchainTransactionServiceProvider,
    ],
    exports: [
        BlockchainWalletServiceProvider,
        BlockchainTransactionServiceProvider
    ]
})

export class BlockchainModule {}
