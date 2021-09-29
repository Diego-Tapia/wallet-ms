import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionModel } from '../models/transaction.model';
import { ITransactionRepository } from './transaction-repository.interface';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectModel(TransactionModel.name) private readonly transactionModel: Model<TransactionModel>,
  ) {}

  public async create(transaction: Transaction): Promise<Transaction> {
    const savedTransaction = await new this.transactionModel(transaction).save();
    return this.toDomainEntity(savedTransaction);
  }

  public async findAll(): Promise<Transaction[]> {
    const transactionModels = await this.transactionModel.find().exec();
    return transactionModels.map((transaction) => this.toDomainEntity(transaction));
  }

  public async findById(id: string): Promise<Transaction> {
    const transactionModel = await this.transactionModel.findById(id).exec();
    return this.toDomainEntity(transactionModel);
  }

  private toDomainEntity(model: TransactionModel): Transaction {
    const { type, hash, Token, walletFrom, walletTo, amount, status,dniFrom } = model;
    const transactionEntity = new Transaction(
      type,
      hash,
      Token.toString(),
      walletFrom.toString(),
      walletTo.toString(),
      amount,
      status,
      dniFrom
    );
    return transactionEntity;
  }
}
