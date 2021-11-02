import { Injectable, Inject } from '@nestjs/common';
import { RequestModel } from 'src/features/auth/infrastructure/service/middleware/auth.middleware';
import { BlockchainTypes } from 'src/features/shared/blockchain/blockchain.types';
import { IBlockchainTransactionService } from 'src/features/shared/blockchain/infrastructure/services/transaction/blockchain-transaction-service.interface';
import { Transaction } from '../../domain/entities/transaction.entity';
import { CreateTransactionDto } from '../../infrastructure/dtos/create-transaction.dto';
import { ICreateTransactionApplication } from './create-transaction.app.interface';
import configs from 'src/configs/environments/configs';
import { ConfigType } from '@nestjs/config';
import { LibrarieTypes } from 'src/features/shared/libaries/librarie.types';
import axios, { AxiosInstance } from 'axios';

import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { stringify } from 'querystring';

@Injectable()
export class CreateTransactionApplication implements ICreateTransactionApplication {
  constructor(
    @Inject(BlockchainTypes.INFRASTRUCTURE.TRANSACTION)
    private readonly blockchainTransactionService: IBlockchainTransactionService,
    @Inject(configs.KEY)
    private readonly configService: ConfigType<typeof configs>,
  ) { }

  public async execute(createTransactionDto: CreateTransactionDto, req: RequestModel): Promise<any> {

    const config = {
      region: process.env.REGION,
      credentials: {
        accessKeyId: this.configService.sqs.accesKeyId,
        secretAccessKey: this.configService.sqs.secretAccessKey,
      }
    };


    const sqsClient = new SQSClient(config);


    const { hash, amount, notes, token } = createTransactionDto;
    const transaction = new Transaction(hash, amount, notes, token);




    const params = {
      MessageBody: JSON.stringify(transaction),
      QueueUrl: this.configService.sqs.url_t,
    };

    const run = async () => {
      try {
        await sqsClient.send(new SendMessageCommand(params));
      } catch (err) {
        throw new Error(err.message);
      }
    };
    run();


    return this.blockchainTransactionService.create(transaction)


  }
}


