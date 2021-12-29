import { Token } from "src/features/token/domain/entities/token.entity";
import { TransactionModel } from "../../infrastructure/models/transaction.model";

export interface ITransaction {
  transactionType: string;
  token: string | Token;
  walletFrom: string;
  walletTo: string;
  amount: number;
  user: string;
  notes?: string;
  id?: string;
  hash?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export class Transaction {
  transactionType: string;
  token: string | Token;
  walletFrom: string;
  walletTo: string;
  amount: number;
  user: string;
  notes?: string;
  hash?: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    transactionType,
    token,
    walletFrom,
    walletTo,
    amount,
    user,
    notes,
    hash,
    id,
    createdAt,
    updatedAt
  }: ITransaction) {
    this.transactionType = transactionType;
    this.token = token as string;
    this.walletFrom = walletFrom;
    this.walletTo = walletTo;
    this.amount = amount;
    this.user = user;
    this.notes = notes;
    this.hash = hash;
    this.id = id;
    this.createdAt = createdAt,
    this.updatedAt = updatedAt
  }

  static toEntity(model: TransactionModel): Transaction {
    const { hash, walletFromId, walletToId, amount, userId, notes, tokenId, transactionTypeId, _id, createdAt, updatedAt } = model;
    const transactionEntity = new Transaction({
      hash,
      amount,
      notes,
      token: tokenId.toString(),
      transactionType: transactionTypeId.toString(),
      user: userId.toString(),
      walletFrom: walletFromId.toString(),
      walletTo: walletToId.toString(),
      id: _id.toString(),
      createdAt,
      updatedAt
    });
    return transactionEntity;
  }

  static toEntityAndPopulate(model: any): Transaction {
    const { hash, walletFromId, walletToId, amount, userId, notes, tokenId, transactionTypeId, _id, createdAt, updatedAt } = model;
    const transactionEntity = new Transaction({
      hash,
      amount,
      notes,
      token: tokenId,
      transactionType: transactionTypeId,
      user: userId.toString(),
      walletFrom: walletFromId.toString(),
      walletTo: walletToId.toString(),
      id: _id.toString(),
      createdAt,
      updatedAt
    });
    return transactionEntity;

  }
}