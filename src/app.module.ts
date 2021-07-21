import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './configs/database/database.module';
import configs from './configs/environments/configs';
import envValidations from './configs/environments/env.validations';
import { TokenFeatureModule } from './features/token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configs],
      isGlobal: true,
      validationSchema: envValidations,
    }),
    TokenFeatureModule,
    DatabaseModule,
  ],
})
export class AppModule {}
