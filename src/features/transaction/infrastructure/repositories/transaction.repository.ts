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

  public async findAll(filter?: FilterQuery<TransactionModel>): Promise<Transaction[]> {
    const transactionModels = await this.transactionModel.find(filter)
      .sort({ createdAt: -1 })
      .exec();
    return transactionModels.map((transaction) => this.toDomainEntity(transaction));
  }

  public async findById(id: string): Promise<Transaction> {
    const transactionModel = await this.transactionModel.findById(id).exec();
    return this.toDomainEntity(transactionModel);
  }

  private toDomainEntity(model: TransactionModel): Transaction {
    const { hash, walletFromId, walletToId, amount, userId, notes, tokenId, transactionTypeId, _id } = model;
    const transactionEntity = new Transaction({
      hash,
      amount,
      notes,
      token: tokenId.toString(),
      transactionType: transactionTypeId.toString(),
      user: userId.toString(),
      walletFrom: walletFromId.toString(),
      walletTo: walletToId.toString(),
      id: _id.toString()
    });
    return transactionEntity;
  }
}
