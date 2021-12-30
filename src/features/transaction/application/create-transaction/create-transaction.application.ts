import { Injectable, Inject, BadRequestException, HttpStatus, HttpException, ConflictException } from '@nestjs/common';
import { RequestModel } from 'src/features/auth/infrastructure/service/middleware/auth.middleware';
import { CreateTransactionDto } from '../../infrastructure/dtos/create-transaction.dto';
import { ICreateTransactionApplication } from './create-transaction.app.interface';
import { QueueEmitterTypes } from 'src/features/queue_emitter/queue-emitter.types';
import { IQueueEmitterTransactionApplication } from 'src/features/queue_emitter/application/transaction/queue-emitter-transaction-app.interface';
import { WalletTypes } from 'src/features/wallet/wallet.type';
import { IWalletRepository } from 'src/features/wallet/infrastructure/repositories/wallet-repository.interface';
import { UserTypes } from 'src/features/user/user.types';
import { ETransactionTypes } from 'src/features/transaction_type/domain/enums/transaction-types.enum';
import { IApiResponse } from 'src/features/shared/interfaces/api-response.interface';
import { Transaction } from '../../domain/entities/transaction.entity';
import { ITransactionQueueMessage } from 'src/features/queue_emitter/domain/interfaces/transaction-queue-message.interface';
import { User } from 'src/features/user/domain/entities/user.entity';
import { IValidateUserApplication } from 'src/features/user/application/validate-user/validate-user-app.interface';

@Injectable()
export class CreateTransactionApplication implements ICreateTransactionApplication {
  constructor(
    @Inject(QueueEmitterTypes.APPLICATION.EMITTER_TRANSACTION)
    private readonly queueEmitterTransactionApplication: IQueueEmitterTransactionApplication,
    @Inject(WalletTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository: IWalletRepository,
    @Inject(UserTypes.APPLICATION.VALIDATE_USER)
    private readonly validateUserApplication: IValidateUserApplication
  ) {}

  public async execute(createTransactionDto: CreateTransactionDto, req: RequestModel) {
    const { amount, notes, token, userIdentifier } = createTransactionDto;
    try {

      const userProfile = await this.validateUserApplication.execute(userIdentifier, req)
      if (!userProfile) throw new HttpException('USER NOT-FOUND', HttpStatus.NOT_FOUND);

      const user = userProfile.userId as User;

      const walletTo = await this.walletRepository.findById(user.walletId as string);
      if (!walletTo) throw new HttpException('Wallet destino no encontrada', HttpStatus.NOT_FOUND);
      
      const walletFrom = await this.walletRepository.findById(req.user.walletId as string);
      if (!walletFrom) throw new BadRequestException('Wallet origen no encontrada');

      if( walletFrom.id === walletTo.id ) throw new BadRequestException('Wallet origen y wallet destino no pueden ser iguales');

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
        amount,
        transactionType: ETransactionTypes.TRANSFER,
        walletFrom: walletFrom.id,
        walletTo: walletTo.id,
        notes,
        userId: req.user.id,
        tokenId: token,
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
