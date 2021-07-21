import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TokenModel } from 'src/features/token/infrastructure/models/token.model';
import { WalletModel } from 'src/features/wallet/infrastructure/models/wallet.model';

@Schema({
  timestamps: true,
})
export class TransactionModel extends Document {
  @Prop({
    required: true,
    enum: ['TRANSFER', 'PAYMENT', 'INCREMENT', 'DECREMENT', 'BUY', 'SELL', 'EXCHANGE'],
  })
  type: string;

  @Prop({ required: true })
  hash: string;

  @Prop({ type: Types.ObjectId, ref: TokenModel.name, required: true })
  token: TokenModel | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: WalletModel.name, required: true })
  walletFrom: WalletModel | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: WalletModel.name, required: true })
  walletTo: WalletModel | Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, enum: ['PENDING', 'REJECTED', 'IN_PROGRESS', 'FINISHED', 'CANCELED'] })
  status: string;
}

export const TransactionSchema = SchemaFactory.createForClass(TransactionModel);
