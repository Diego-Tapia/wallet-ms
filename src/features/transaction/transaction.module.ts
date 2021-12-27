import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionController } from 'src/api/transaction/transaction.controller';
import { AuthFeatureModule } from '../auth/auth.module';
import { QueueEmitterFeatureModule } from '../queue_emitter/queue-emitter.module';
import { BlockchainModule } from '../shared/blockchain/blockchain.module';
import { LibrarieModule } from '../shared/libaries/librarie.module';
import { UserProfileModel, UserProfileSchema } from '../user_profile/infrastructure/models/user-profile.model';
import { UserProfileRepositoryProvider } from '../user_profile/infrastructure/repositories/user-repository.provider';
import { WalletFeatureModule } from '../wallet/wallet.module';
import { CreateTransactionApplicationProvider } from './application/create-transaction/create-transaction.provider';
import { GetAllTransactionsApplicationProvider } from './application/get-all-transaction/get-all-transactions.provider';
import { GetTransactionByIdApplicationProvider } from './application/get-transaction-by-id/get-transaction-by-id.provider';
import { TransactionModel, TransactionSchema } from './infrastructure/models/transaction.model';
import { TransactionRepositoryProvider } from './infrastructure/repositories/transaction-repository.provider';

@Module({
  controllers: [TransactionController],
  imports: [
    LibrarieModule,
    AuthFeatureModule,
    BlockchainModule,
    QueueEmitterFeatureModule,
    WalletFeatureModule,
    MongooseModule.forFeature([
      { name: TransactionModel.name, schema: TransactionSchema },
      { name: UserProfileModel.name, schema: UserProfileSchema }]),
  ],
  providers: [
    UserProfileRepositoryProvider,
    TransactionRepositoryProvider,
    CreateTransactionApplicationProvider,
    GetAllTransactionsApplicationProvider,
    GetTransactionByIdApplicationProvider,
  ],
})
export class TransactionFeatureModule  {}
