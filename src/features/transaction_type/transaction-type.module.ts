import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionTypeModel, TransactionTypeSchema } from "./infrastructure/models/token-type.model";

@Module({
    imports: [
      MongooseModule.forFeature([{ name: TransactionTypeModel.name, schema: TransactionTypeSchema }]),
    ],
  })
export class TransactionTypeFeatureModule {}
