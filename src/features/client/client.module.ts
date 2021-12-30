import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientModel, ClientSchema } from "./infrastructure/models/client.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ClientModel.name, schema: ClientSchema }])
    ]
})
export class ClientFeatureModule {}
