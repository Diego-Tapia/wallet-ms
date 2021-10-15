import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserModel } from 'src/features/auth/infrastructure/models/user.entity';
import { TokenModel } from 'src/features/token/infrastructure/models/token.model';
import { WalletModel } from 'src/features/wallet/infrastructure/models/wallet.model';

@Schema({
  timestamps: true,
})
export class TransactionModel extends Document {

  @Prop({ required: true })
  hash: string;

  @Prop({ type: Types.ObjectId, ref: TokenModel.name, required: true })
  token_id: TokenModel | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: WalletModel.name, required: true })
  walletFrom_id: WalletModel | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: WalletModel.name, required: true })
  walletTo_id: WalletModel | Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: UserModel.name, required: true })
  user_id: UserModel | Types.ObjectId;

  @Prop({ required: true })
  notes: string;

}

export const TransactionSchema = SchemaFactory.createForClass(TransactionModel);
