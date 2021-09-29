import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { WalletModel } from 'src/features/wallet/infrastructure/models/wallet.model';

@Schema({
  timestamps: true,
})
export class UserModel extends Document {
  @Prop({ type: Types.ObjectId, ref: WalletModel.name, required: true })
  idWallet: WalletModel | Types.ObjectId;

  @Prop({ required: true })
  dni: number;

  @Prop({ required: true })
  shortName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  cuil: number;

  @Prop({ required: true  })
  email: string;

  @Prop({ required: true })
  phoneNumber: number;

  @Prop({ required: true })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
