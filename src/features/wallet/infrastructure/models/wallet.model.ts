import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TokenModel } from 'src/features/token/infrastructure/models/token.model';

@Schema({
  _id:true, timestamps: true,
})
export class WalletModel extends Document {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  privateKey: string;

  @Prop(raw({
    token_id: { type: Types.ObjectId, ref: TokenModel.name },
    amount: { type: Number }
  }))
  balance: Record<string, any>[];

}

export const WalletSchema = SchemaFactory.createForClass(WalletModel);
