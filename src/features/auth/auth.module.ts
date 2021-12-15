import { Module } from '@nestjs/common';
import { AuthController } from '../../api/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/service/jwt.strategy';
import { ConfigModule, ConfigService, ConfigType, registerAs } from '@nestjs/config';
import configs from 'src/configs/environments/configs';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthRepositoryProvider } from './infrastructure/repositories/auth-user-repository.provider';
import { UserLoginProvider } from './application/login-user/user-login.provider';
import { UserRegistrerProvider } from './application/register-user/user-registrer.provider';
import { UserConfirmProvider } from './application/user-confirm/user-confirm.provider';
import { JwtModule } from '@nestjs/jwt';
import { UserRepositoryProvider } from '../user_profile/infrastructure/repositories/user-repository.provider';
import { UserProfileModel, UserProfileSchema } from '../user_profile/infrastructure/models/user-profile.model';
import { UserModel, UserSchema } from './infrastructure/models/user.model';
import { WalletFeatureModule } from '../wallet/wallet.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configs],
      isGlobal: true,
    }),
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: UserProfileModel.name, schema: UserProfileSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [configs.KEY],
      useFactory:(config: ConfigType<typeof configs>) => {
        return {
          secret: config.secret.secret,

          signOptions: { expiresIn: '3600s' },
         }
      }
    }),
    WalletFeatureModule
    
  ],
  providers: [
    JwtStrategy,
    UserAuthRepositoryProvider,
    UserRepositoryProvider,
    UserLoginProvider,
    UserRegistrerProvider,
    UserConfirmProvider,
  ],
  controllers: [AuthController],
  exports: [UserAuthRepositoryProvider,UserRepositoryProvider],
})
export class AuthFeatureModule {}
