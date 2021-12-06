import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { permittedCrossDomainPolicies } from 'helmet';

import configs from '../environments/configs';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://userTest:b2AO7kgzrn1u8Pvu@interconomy-cluster.ksulu.mongodb.net/interconomy',
      }),
    })
  ],
})
export class DatabaseModule {}
