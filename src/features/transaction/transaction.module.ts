import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionController } from 'src/api/transaction/transaction.controller';
import { AuthFeatureModule } from '../auth/auth.module';
import { UserProfileModel, UserProfileSchema } from '../user_profile/infrastructure/models/user-profile.model';
import { UserRepositoryProvider } from '../user_profile/infrastructure/repositories/user-repository.provider';
import { CreateTransactionApplicationProvider } from './application/create-transaction/create-transaction.provider';
import { GetAllTransactionsApplicationProvider } from './application/get-all-transaction/get-all-transactions.provider';
import { GetTransactionByIdApplicationProvider } from './application/get-transaction-by-id/get-transaction-by-id.provider';
import { TransactionModel, TransactionSchema } from './infrastructure/models/transaction.model';
import { TransactionRepositoryProvider } from './infrastructure/repositories/transaction-repository.provider';

@Module({
  controllers: [TransactionController],
  imports: [AuthFeatureModule,
    MongooseModule.forFeature([{ name: TransactionModel.name, schema: TransactionSchema },{ name: UserProfileModel.name, schema: UserProfileSchema }]),
  ],
  providers: [
    UserRepositoryProvider,
    TransactionRepositoryProvider,
    CreateTransactionApplicationProvider,
    GetAllTransactionsApplicationProvider,
    GetTransactionByIdApplicationProvider,
  ],
})
export class TransactionFeatureModule {}
