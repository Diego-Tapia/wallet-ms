import { Injectable, Inject } from '@nestjs/common';
import { Error } from 'mongoose';
import { RequestModel } from 'src/features/auth/infrastructure/service/middleware/auth.middleware';
import { BlockchainTypes } from 'src/features/shared/blockchain/blockchain.types';
import { ITransactionBlockchainService } from 'src/features/shared/blockchain/infrastructure/service/transaction/transaction-blockchain-service.interface';
import { IUserRepository } from 'src/features/user_profile/infrastructure/repositories/user-repository.interface';
import { UserTypes } from 'src/features/user_profile/user.types';
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
    @Inject(BlockchainTypes.INFRASTRUCTURE.TRANSACTION)
    private readonly transactionBlockchainService: ITransactionBlockchainService
  ) { }

  public async execute(createTransactionDto: CreateTransactionDto, req: RequestModel): Promise<Transaction> {

    try {
      const {hash,amount,notes,dni } = createTransactionDto;
      const walletTo = await this.userRepository.findOne(dni);
      if (walletTo === null) {
        throw new Error('user was not found')
      }

      const transaction = new Transaction(
        hash,
        amount,
        notes
      );

      return this.transactionBlockchainService.create(transaction);
      // return this.transactionRepository.create(transaction);

    } catch (error) {
      console.log(error)
      throw new Error('Error in transaction application:')
    }


  }
}
