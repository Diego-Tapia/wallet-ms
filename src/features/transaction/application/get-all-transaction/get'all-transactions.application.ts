import { Injectable, Inject } from '@nestjs/common';
import { Transaction } from '../../domain/entities/transaction.entity';
import { ITransactionRepository } from '../../infrastructure/repositories/transaction-repository.interface';
import { TransactionTypes } from '../../transaction.types';
import { IGetAllTransactionsApplication } from "./get-all-transactions'app.interface";

@Injectable()
export class GetAllTransactionsApplication implements IGetAllTransactionsApplication {
  constructor(
    @Inject(TransactionTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  public execute(): Promise<Transaction[]> {
    return this.transactionRepository.findAll();
  }
}
