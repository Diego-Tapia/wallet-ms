import { Injectable, Inject } from '@nestjs/common';
import { Transaction } from '../../domain/entities/transaction.entity';
import { ITransactionRepository } from '../../infrastructure/repositories/transaction-repository.interface';
import { TransactionTypes } from '../../transaction.types';
import { IGetTransactionByIdApplication } from './get-transaction-by-id-app.interface';

@Injectable()
export class GetTransactionByIdApplication implements IGetTransactionByIdApplication {
  constructor(
    @Inject(TransactionTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  public execute(id: string): Promise<Transaction> {
    return this.transactionRepository.findById(id);
  }
}
