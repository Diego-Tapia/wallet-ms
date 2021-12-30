import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PopulateOptions } from 'mongoose';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionModel } from '../models/transaction.model';
import { ITransactionRepository } from './transaction-repository.interface';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectModel(TransactionModel.name) 
    private readonly transactionModel: Model<TransactionModel>,
  ) {}

  public async findAll(filter?: FilterQuery<TransactionModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Transaction[]> {
    const query = this.transactionModel.find(filter);

    if(options) query.populate(options);
    const models = await query.sort({ createdAt: -1 }).exec();

    return models.map((model) => Transaction.toEntity(model) as Transaction);
  }

  public async findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<Transaction> {
    const query = this.transactionModel.findById(id);

    if(options) query.populate(options);
    const model = await query.exec();
    
    return model ? Transaction.toEntity(model) as Transaction : null
  }
}
