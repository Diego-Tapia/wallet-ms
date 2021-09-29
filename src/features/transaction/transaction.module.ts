import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionController } from 'src/api/transaction/transaction.controller';
import { AuthFeatureModule } from '../auth/auth.module';
import { UserAuthRepositoryProvider } from '../auth/infrastructure/repositories/auth-user-repository.provider';
import { UserModel, UserSchema } from '../user/infrastructure/models/user.model';
import { UserRepositoryProvider } from '../user/infrastructure/repositories/user-repository.provider';
import { CreateTransactionApplicationProvider } from './application/create-transaction/create-transaction.provider';
import { GetAllTransactionsApplicationProvider } from './application/get-all-transaction/get-all-transactions.provider';
import { GetTransactionByIdApplicationProvider } from './application/get-transaction-by-id/get-transaction-by-id.provider';
import { TransactionModel, TransactionSchema } from './infrastructure/models/transaction.model';
import { TransactionRepositoryProvider } from './infrastructure/repositories/transaction-repository.provider';

@Module({
  controllers: [TransactionController],
  imports: [AuthFeatureModule,
    MongooseModule.forFeature([{ name: TransactionModel.name, schema: TransactionSchema },{ name: UserModel.name, schema: UserSchema }]),
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
