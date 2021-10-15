import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApplicabilityModel } from 'src/features/appicability/infrastructure/models/applicability.model';
import { TransactionTypeModel } from 'src/features/transaction_type/infrastructure/models/token-type.model';

@Schema({
  timestamps: true,
})
export class TokenModel extends Document {

  @Prop({ required: true, maxlength: 30 })
  shortName: string;

  @Prop()
  description?: string;

  @Prop({ required: true, maxlength: 5 })
  symbol: string;

  @Prop({ required: true, min: 1 })
  price: number;

  @Prop({ required: true, maxlength: 5 })
  money: string;

  @Prop({ required: true, enum: ['ACTIVE', 'BLOCKED', 'PENDING_APPROVE', 'INACTIVE'] })
  status: string;

  @Prop({ required: true, min: 0 })
  itemId: number;

  @Prop()
  validFrom?: Date;

  @Prop()
  validTo?: Date;

  @Prop()
  bc_item_id: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: TransactionTypeModel.name }] })
  operations: TransactionTypeModel[];

  @Prop({ type: [{ type: Types.ObjectId, ref: ApplicabilityModel.name }] })
  applicabilities: ApplicabilityModel[];

}

export const TokenSchema = SchemaFactory.createForClass(TokenModel);
