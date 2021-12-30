import { Token } from "src/features/token/domain/entities/token.entity";
import { TokenModel } from "src/features/token/infrastructure/models/token.model";
import { TransactionType } from "src/features/transaction_type/domain/entities/transactionType.entity";
import { TransactionTypeModel } from "src/features/transaction_type/infrastructure/models/token-type.model";
import { User } from "src/features/user/domain/entities/user.entity";
import { UserModel } from "src/features/user/infrastructure/models/user.model";
import { Wallet } from "src/features/wallet/domain/entities/wallet.entity";
import { WalletModel } from "src/features/wallet/infrastructure/models/wallet.model";
import { TransactionModel } from "../../infrastructure/models/transaction.model";

export interface ITransaction {
  transactionType: string | TransactionType;
  token: string | Token;
  walletFrom: string | Wallet;
  walletTo: string | Wallet;
  amount: number;
  user: string | User;
  notes?: string;
  id?: string;
  hash?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export class Transaction {
  transactionType: string | TransactionType;
  token: string | Token;
  walletFrom: string | Wallet;
  walletTo: string | Wallet;
  amount: number;
  user: string | User;
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
    this.token = token;
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

  static toEntity(model: TransactionModel): Transaction | string {
    const { hash, walletFromId, walletToId, amount, userId, notes, tokenId, transactionTypeId, _id, createdAt, updatedAt } = model;
    
    const isString = typeof model === 'string';
      if (isString) return String(model);    
    
      const transactionEntity = new Transaction({
      hash,
      amount,
      notes,
      token: Token.toEntity(tokenId as TokenModel),
      transactionType: TransactionType.toEntity(transactionTypeId as TransactionTypeModel),
      user: User.toEntity(userId as UserModel),
      walletFrom: Wallet.toEntity(walletFromId as WalletModel),
      walletTo: Wallet.toEntity(walletToId as WalletModel),
      id: _id.toString(),
      createdAt,
      updatedAt
    });
    return transactionEntity;
  }
}