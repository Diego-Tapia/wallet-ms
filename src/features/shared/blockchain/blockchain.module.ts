import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BlockchainTransactionServiceProvider } from './infrastructure/services/transaction/blockchain-transaction-service.provider';
import { BlockchainWalletServiceProvider } from './infrastructure/services/wallet/blockchain-wallet.provider';

@Module({
    imports: [
        HttpModule
    ],
    providers: [
        BlockchainWalletServiceProvider,
        BlockchainTransactionServiceProvider
    ],
    exports: [
        BlockchainWalletServiceProvider,
        BlockchainTransactionServiceProvider
    ]
})

export class BlockchainModule {}
