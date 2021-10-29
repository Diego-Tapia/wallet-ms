import { Injectable, Inject } from '@nestjs/common';
import { RequestModel } from 'src/features/auth/infrastructure/service/middleware/auth.middleware';
import { BlockchainTypes } from 'src/features/shared/blockchain/blockchain.types';
import { IBlockchainTransactionService } from 'src/features/shared/blockchain/infrastructure/services/transaction/blockchain-transaction-service.interface';
import { Transaction } from '../../domain/entities/transaction.entity';
import { CreateTransactionDto } from '../../infrastructure/dtos/create-transaction.dto';
import { ICreateTransactionApplication } from './create-transaction.app.interface';

@Injectable()
export class CreateTransactionApplication implements ICreateTransactionApplication {
  constructor(
    @Inject(BlockchainTypes.INFRASTRUCTURE.TRANSACTION)
    private readonly blockchainTransactionService: IBlockchainTransactionService
  ) { }

  public execute(createTransactionDto: CreateTransactionDto, req: RequestModel): Promise<Transaction> {
    const { hash, amount, notes } = createTransactionDto;
    const transaction = new Transaction(hash, amount, notes);
    return this.blockchainTransactionService.create(transaction)
  }
}
