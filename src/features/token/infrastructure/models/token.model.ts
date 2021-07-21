import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class TokenModel extends Document {
  @Prop({ required: true, maxlength: 5 })
  symbol: string;

  @Prop({ required: true, maxlength: 30 })
  shortName: string;

  @Prop()
  description?: string;

  @Prop({ required: true, min: 0 })
  itemId: number;

  @Prop()
  validFrom?: Date;

  @Prop()
  validTo?: Date;

  @Prop({ required: true, min: 1 })
  initialAmount: number;

  @Prop({ required: true, enum: ['ACTIVE', 'BLOCKED', 'PENDING_APPROVE', 'INACTIVE'] })
  status: string;
}

export const TokenSchema = SchemaFactory.createForClass(TokenModel);
