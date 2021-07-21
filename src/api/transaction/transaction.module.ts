import { Module } from '@nestjs/common';
import { TransactionService } from '../../features/transaction/infrastructure/services/transaction.service';
import { TransactionController } from './transaction.controller';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionApiModule {}
