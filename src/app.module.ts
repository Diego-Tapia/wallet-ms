import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { AuthorizationController } from './api/authorization/authorization.controller';
import { AuthorizationService } from './api/authorization/authorization.service';
import { DatabaseModule } from './configs/database/database.module';
import configs from './configs/environments/configs';
import envValidations from './configs/environments/env.validations';
import { TokenFeatureModule } from './features/token/token.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configs],
      isGlobal: true,
      validationSchema: envValidations,
    }),
    TokenFeatureModule,
    DatabaseModule,
  ],
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
})
export class AppModule {}
