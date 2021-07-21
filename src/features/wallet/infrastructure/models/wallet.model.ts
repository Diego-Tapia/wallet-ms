import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class WalletModel extends Document {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  privateKey: string;
}

export const WalletSchema = SchemaFactory.createForClass(WalletModel);
