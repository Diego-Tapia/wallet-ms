import { Injectable, Inject, ConsoleLogger } from '@nestjs/common';
import { RequestModel } from 'src/features/auth/infrastructure/service/middleware/auth.middleware';
import { Transaction } from '../../domain/entities/transaction.entity';
import { IGetAllTransactionsApplication } from "./get-all-transactions.app.interface";
import { TransactionTypes } from '../../transaction.types';
import { ITransactionRepository } from '../../infrastructure/repositories/transaction-repository.interface';

@Injectable()
export class GetAllTransactionsApplication implements IGetAllTransactionsApplication {
  constructor(
    @Inject(TransactionTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly transactionRepository: ITransactionRepository
  ) {}

  public execute(req: RequestModel): Promise<Transaction[]> {
    const { wallet_id } = req.user;
    return this.transactionRepository.findAll({ walletFrom: wallet_id } || { walletTo: wallet_id })
  }
}