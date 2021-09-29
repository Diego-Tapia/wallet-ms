import { Injectable, Inject } from '@nestjs/common';
import { Error } from 'mongoose';
import { RequestModel } from 'src/features/auth/infrastructure/service/middleware/auth.middleware';
import { IUserRepository } from 'src/features/user/infrastructure/repositories/user-repository.interface';
import { UserTypes } from 'src/features/user/user.types';
import { Transaction } from '../../domain/entities/transaction.entity';
import { CreateTransactionDto } from '../../infrastructure/dtos/create-transaction.dto';
import { ITransactionRepository } from '../../infrastructure/repositories/transaction-repository.interface';
import { TransactionTypes } from '../../transaction.types';
import { ICreateTransactionApplication } from './create-transaction.app.interface';

@Injectable()
export class CreateTransactionApplication implements ICreateTransactionApplication {
  constructor(
    @Inject(TransactionTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly transactionRepository: ITransactionRepository,
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserRepository,

  ) { }

  public async execute(createTransactionDto: CreateTransactionDto, req: RequestModel): Promise<Transaction> {

    try {
      const { dniFrom, Token, amount } = createTransactionDto;
      const walletTo = await this.userRepository.findOne(dniFrom);
      if (walletTo === null) {
        throw new Error('wallet was not found')
      }

      const transaction = new Transaction(
        'TRANSFER',
        'HASH',
        Token,
        req.user.idWallet,
        walletTo.idWallet,
        amount,
        'IN_PROGRESS',
        dniFrom,
      );

      return this.transactionRepository.create(transaction);

    } catch (error) {
      throw new Error('Error in transaction application:')
    }


  }
}
