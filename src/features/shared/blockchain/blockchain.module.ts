import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TransactionBlockchainServiceProvider } from './infrastructure/services/transaction/transaction-blockchain-service.provider';
import { BlockchainWalletServiceProvider } from './infrastructure/services/wallet/blockchain-wallet.provider';

@Module({
    imports: [
        HttpModule
    ],
    providers: [
        BlockchainWalletServiceProvider,
        TransactionBlockchainServiceProvider
    ],
    exports: [
        BlockchainWalletServiceProvider,
        TransactionBlockchainServiceProvider
    ]
})

export class BlockchainModule {}
