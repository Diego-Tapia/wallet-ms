import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthFeatureModule } from './features/auth/auth.module';
import { DatabaseModule } from './configs/database/database.module';
import configs from './configs/environments/configs';
import envValidations from './configs/environments/env.validations';
import { TokenFeatureModule } from './features/token/token.module';
import { TransactionFeatureModule } from './features/transaction/transaction.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthMiddleware } from './features/auth/infrastructure/service/middleware/auth.middleware';
import { TransactionController } from './api/transaction/transaction.controller';
import { UserFeatureModule } from './features/user_profile/user.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configs],
      isGlobal: true,
      validationSchema: envValidations,
    }),
    TokenFeatureModule,
    DatabaseModule,
    AuthFeatureModule,
    TransactionFeatureModule,
    UserFeatureModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/auth/register', method: RequestMethod.POST },
        { path: 'api/auth/confirm', method: RequestMethod.POST },
        { path: 'api/auth/login', method: RequestMethod.POST },
      )
      .forRoutes(TransactionController)
  }
}