import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';

@Schema({
  timestamps: true,
})
export class TokenTypeModel extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true})
  description: string;

}

export const TokenTypeSchema = SchemaFactory.createForClass(TokenTypeModel);
