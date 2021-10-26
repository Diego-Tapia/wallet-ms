import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TransactionBlockchainServiceProvider } from './infrastructure/service/transaction/transaction-blockchain-service.provider';

@Module({
    imports: [
        HttpModule
    ],
    providers: [
        TransactionBlockchainServiceProvider
    ],
    exports: [
        TransactionBlockchainServiceProvider
    ]
})
export class BlockchainModule {}
