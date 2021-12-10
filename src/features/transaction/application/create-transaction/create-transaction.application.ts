import { Injectable, Inject, BadRequestException, HttpStatus, HttpException } from '@nestjs/common';
import { RequestModel } from 'src/features/auth/infrastructure/service/middleware/auth.middleware';
import { CreateTransactionDto } from '../../infrastructure/dtos/create-transaction.dto';
import { ICreateTransactionApplication } from './create-transaction.app.interface';
import { QueueEmitterTypes } from 'src/features/queue_emitter/queue-emitter.types';
import { IQueueEmitterTransactionApplication } from 'src/features/queue_emitter/application/transaction/queue-emitter-transaction-app.interface';
import { WalletTypes } from 'src/features/wallet/wallet.type';
import { IWalletRepository } from 'src/features/wallet/infrastructure/repositories/wallet-repository.interface';
import { UserTypes } from 'src/features/user_profile/user.types';
import { IUserRepository } from 'src/features/user_profile/infrastructure/repositories/user-repository.interface';
import { ETransactionTypes } from 'src/features/transaction_type/domain/enums/transaction-types.enum';
import { ITransactionQueueMessage } from 'src/features/queue_emitter/domain/interfaces/transaction-queue-message.interface';
import { UserAuthTypes } from 'src/features/auth/auth.types';
import { IUserAuthRepository } from 'src/features/auth/infrastructure/repositories/auth-user-repository.interface';
import { IApiResponse } from 'src/features/shared/interfaces/api-response.interface';

@Injectable()
export class CreateTransactionApplication implements ICreateTransactionApplication {
  constructor(
    @Inject(QueueEmitterTypes.APPLICATION.EMITTER_TRANSACTION)
    private readonly queueEmitterTransactionApplication: IQueueEmitterTransactionApplication,
    @Inject(WalletTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository : IWalletRepository,
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userProfileRepository: IUserRepository,
    @Inject(UserAuthTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userAuthRepository: IUserAuthRepository
  ) { }

  public async execute(createTransactionDto: CreateTransactionDto, req: RequestModel): Promise<IApiResponse<any>> {

    const { amount, notes, token, dni } = createTransactionDto;
    try {
      
      const userProfile = await this.userProfileRepository.findOne(dni);
      if (!userProfile) throw new BadRequestException(`There is no user with the DNI ${dni}`)
      
      const user = await this.userAuthRepository.findById(userProfile.user_id);
      
      const walletTo = await this.walletRepository.findById(user.wallet_id);

      const walletFrom = await this.walletRepository.findById(req.user.wallet_id);
      if (!walletFrom) throw new BadRequestException('no wallet')

      const transaction: ITransactionQueueMessage = {
        amount,
        token,
        transactionType: ETransactionTypes.TRANSFER,
        userId: req.user._id,
        walletFrom: walletFrom._id,
        walletTo: walletTo._id,
        notes
      } 

      this.queueEmitterTransactionApplication.execute(transaction)

      let response: IApiResponse<ITransactionQueueMessage> = {
        status: 200,
        message: 'Transaferencia en progreso',
        success: true,
        data: transaction,
      };

      return response;
    
    } catch (error) {
      let response: IApiResponse<null> = {
        status: 400,
        message: error.message || 'no se pude realizar la transaferencia',
        success: false,
        data: error.response || error,
      }
      return response;
    }
  }
}


