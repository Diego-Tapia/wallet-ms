import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionController } from 'src/api/transaction/transaction.controller';
import { AuthFeatureModule } from '../auth/auth.module';
import { QueueEmitterFeatureModule } from '../queue_emitter/queue-emitter.module';
import { BlockchainModule } from '../shared/blockchain/blockchain.module';
import { LibrarieModule } from '../shared/libaries/librarie.module';
import { TransactionTypeFeatureModule } from '../transaction_type/transaction-type.module';
import { UserProfileModel, UserProfileSchema } from '../user/infrastructure/models/user-profile.model';
import { UserProfileRepositoryProvider } from '../user/infrastructure/repositories/user-profile/user-profile-repository.provider';
import { UserFeatureModule } from '../user/user.module';
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
    BlockchainModule,
    QueueEmitterFeatureModule,
    WalletFeatureModule,
    TransactionTypeFeatureModule,
    UserFeatureModule,
    MongooseModule.forFeature([
      { name: TransactionModel.name, schema: TransactionSchema },
      { name: UserProfileModel.name, schema: UserProfileSchema }
    ]),
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
