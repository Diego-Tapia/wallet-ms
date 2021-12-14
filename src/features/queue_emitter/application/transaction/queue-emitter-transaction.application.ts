import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import configs from 'src/configs/environments/configs';
import { Transaction } from 'src/features/transaction/domain/entities/transaction.entity';
import { ISqsEmitterService } from '../../infrastructure/services/sqs/sqs-emitter-service.interface';
import { QueueEmitterTypes } from '../../queue-emitter.types';
import { IQueueEmitterTransactionApplication } from './queue-emitter-transaction-app.interface';

export class QueueEmitterTransactionApplication implements IQueueEmitterTransactionApplication {
  constructor(
    @Inject(QueueEmitterTypes.INFRASTRUCTURE.SQS_EMITTER_SERVICE)
    private readonly sqsEmitterService: ISqsEmitterService,
    @Inject(configs.KEY)
    private readonly configService: ConfigType<typeof configs>,
  ) {}

  execute(message: Transaction) {
    this.sqsEmitterService.sendMessage<Transaction>(this.configService.sqs.url_t, message);
  }
}