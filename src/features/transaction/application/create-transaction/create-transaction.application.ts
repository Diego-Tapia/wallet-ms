import { Injectable, Inject, BadRequestException, HttpStatus, HttpException, ConflictException } from '@nestjs/common';
import { RequestModel } from 'src/features/auth/infrastructure/service/middleware/auth.middleware';
import { CreateTransactionDto } from '../../infrastructure/dtos/create-transaction.dto';
import { ICreateTransactionApplication } from './create-transaction.app.interface';
import { QueueEmitterTypes } from 'src/features/queue_emitter/queue-emitter.types';
import { IQueueEmitterTransactionApplication } from 'src/features/queue_emitter/application/transaction/queue-emitter-transaction-app.interface';
import { WalletTypes } from 'src/features/wallet/wallet.type';
import { IWalletRepository } from 'src/features/wallet/infrastructure/repositories/wallet-repository.interface';
import { UserProfileTypes } from 'src/features/user_profile/user.types';
import { IUserProfileRepository } from 'src/features/user_profile/infrastructure/repositories/user-repository.interface';
import { ETransactionTypes } from 'src/features/transaction_type/domain/enums/transaction-types.enum';
import { UserAuthTypes } from 'src/features/auth/auth.types';
import { IUserAuthRepository } from 'src/features/auth/infrastructure/repositories/auth-user-repository.interface';
import { IApiResponse } from 'src/features/shared/interfaces/api-response.interface';
import { Transaction } from '../../domain/entities/transaction.entity';
import { ITransactionQueueMessage } from 'src/features/queue_emitter/domain/interfaces/transaction-queue-message.interface';
import { User } from 'src/features/auth/domain/entities/user.entity';
import { UserProfile } from 'src/features/user_profile/domain/entities/user.entity';

@Injectable()
export class CreateTransactionApplication implements ICreateTransactionApplication {
  constructor(
    @Inject(QueueEmitterTypes.APPLICATION.EMITTER_TRANSACTION)
    private readonly queueEmitterTransactionApplication: IQueueEmitterTransactionApplication,
    @Inject(WalletTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository: IWalletRepository,
    @Inject(UserProfileTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userProfileRepository: IUserProfileRepository,
    @Inject(UserAuthTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userAuthRepository: IUserAuthRepository,
  ) {}

  public async execute(createTransactionDto: CreateTransactionDto, req: RequestModel) {
    const { amount, notes, token, userIdentifier } = createTransactionDto;
    try {

      let userTemp: User;
      let userProfile: UserProfile
      const isNumber = !isNaN(Number(userIdentifier)); 
      
      if (isNumber) {
        userProfile = await this.userProfileRepository.findOneByParams(+userIdentifier)
      }

      if (!userProfile && !isNumber ) {
        userTemp = await this.userAuthRepository.findOneByParams(userIdentifier);
      }
      
      const user =  userTemp || userProfile?.userId as User
      if (!user) throw new HttpException('USER NOT-FOUND', HttpStatus.NOT_FOUND);

      const walletTo = await this.walletRepository.findById(user.walletId);
      if (!walletTo) throw new HttpException('Wallet destino no encontrada', HttpStatus.NOT_FOUND);
      
      const walletFrom = await this.walletRepository.findById(req.user.walletId);
      if (!walletFrom) throw new BadRequestException('Wallet origen no encontrada');

      if (!walletFrom.hasEnoughFunds(token, amount))
      throw new ConflictException("Wallet origen sin fondos suficientes.");

      const transaction = new Transaction({
        amount,
        token,
        transactionType: ETransactionTypes.TRANSFER,
        user: req.user.id,
        walletFrom: walletFrom.id,
        walletTo: walletTo.id,
        notes,
      });

      const transactionQueueMessage: ITransactionQueueMessage = {
        ...transaction,
        userId: transaction.user,
        tokenId: transaction.token,
      }

      this.queueEmitterTransactionApplication.execute(transactionQueueMessage);

      let response: IApiResponse<Transaction> = {
        status: 201,
        message: 'Transfer in progress',
        success: true,
        data: transaction,
      };

      return response;

    } catch (error) {

      let response: IApiResponse<any> = {
        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Fail transfer',
        success: false,
        data: error.response || error,
      };

      return response
    }
  }
}
