import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserModel } from 'src/features/auth/infrastructure/models/user.model';
import { TokenModel } from 'src/features/token/infrastructure/models/token.model';
import { TransactionTypeModel } from 'src/features/transaction_type/infrastructure/models/token-type.model';
import { WalletModel } from 'src/features/wallet/infrastructure/models/wallet.model';

@Schema({
  timestamps: true,
})
export class TransactionModel extends Document {

  @Prop({ required: true })
  hash: string;

  @Prop({ type: Types.ObjectId, ref: TransactionTypeModel.name})
  transactionTypeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: TokenModel.name})
  tokenId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: WalletModel.name})
  walletFromId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: WalletModel.name})
  walletToId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: UserModel.name })
  userId: Types.ObjectId;

  @Prop({ })
  notes: string;

  @Prop({})
  createdAt: Date;
  
  @Prop({ })
  updatedAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(TransactionModel);
