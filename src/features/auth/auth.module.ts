import { Module } from '@nestjs/common';
import { AuthController } from '../../api/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/service/jwt.strategy';
import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import configs from 'src/configs/environments/configs';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthRepositoryProvider } from './infrastructure/repositories/auth-user-repository.provider';
import { UserLoginProvider } from './application/login-user/user-login.provider';
import { UserRegistrerProvider } from './application/register-user/user-registrer.provider';
import { UserConfirmProvider } from './application/user-confirm/user-confirm.provider';
import { UserRepositoryProvider } from '../user/infrastructure/repositories/user-repository.provider';
import { JwtModule } from '@nestjs/jwt';
import { UserProfileModel, UserProfileSchema } from '../user/infrastructure/models/user-profile.model';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configs],
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: UserProfileModel.name, schema: UserProfileSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory:( config: ConfigService) => {
        return {
          secret: config.get('secret'),
          signOptions: { expiresIn: '3600s' },
         }
      }
    })
    
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
