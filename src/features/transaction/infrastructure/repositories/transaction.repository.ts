import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionModel } from '../models/transaction.model';
import { ITransactionRepository } from './transaction-repository.interface';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectModel(TransactionModel.name) private readonly transactionModel: Model<TransactionModel>,
  ) {}

  public async findAll(filter?: FilterQuery<TransactionModel>, paths?: Array<{ path: string }> | null): Promise<Transaction[]> {
    const query = this.transactionModel.find(filter);

    if(paths) query.populate(paths);
    const model = await query.sort({ createdAt: -1 }).exec();

    if(paths) return model.map((transaction) => Transaction.toEntityAndPopulate(transaction));
    return model.map((transaction) => Transaction.toEntity(transaction));
  }

  public async findById(id: string, paths?: Array<{ path: string }> | null): Promise<Transaction> {
    const query = this.transactionModel.findById(id);

    if(paths) query.populate(paths);
    const model = await query.exec();
    
    if(paths) return Transaction.toEntityAndPopulate(model)
    return Transaction.toEntity(model);
  }
}
