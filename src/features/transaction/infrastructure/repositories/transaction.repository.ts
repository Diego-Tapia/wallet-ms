import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionModel } from '../models/transaction.model';
import { IIdWalletFilter, ITransactionRepository } from './transaction-repository.interface';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectModel(TransactionModel.name) private readonly transactionModel: Model<TransactionModel>,
  ) {}

  public async create(transaction: Transaction): Promise<Transaction> {
    const savedTransaction = await new this.transactionModel(transaction).save();
    return this.toDomainEntity(savedTransaction);
  }
  public async findAll(filter: IIdWalletFilter): Promise<Transaction[]> {
    const transactionModels = await this.transactionModel.find((filter))
      .sort({ createdAt: -1 })
      .exec();
    return transactionModels.map((transaction) => this.toDomainEntity(transaction));
  }

  public async findById(id: string): Promise<Transaction> {
    const transactionModel = await this.transactionModel.findById(id).exec();
    return this.toDomainEntity(transactionModel);
  }

  private toDomainEntity(model: TransactionModel): Transaction {
    const { hash, token_id,walletFrom_id,walletTo_id,amount,user_id,notes } = model;
    const transactionEntity = new Transaction(
      hash,
      amount,
      notes,

    );
    return transactionEntity;
  }
}
