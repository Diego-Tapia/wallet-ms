import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileModel, UserProfileSchema } from './infrastructure/models/user-profile.model';
import { ValidateUserApplicationProvider } from './application/validate-user/validate-user.provider';
import { UserController } from 'src/api/user/user.controller';
import { ClientFeatureModule } from '../client/client.module';
import { UserProfileRepositoryProvider } from './infrastructure/repositories/user-profile/user-profile-repository.provider';
import { UserModel, UserSchema } from './infrastructure/models/user.model';
import { UserRepositoryProvider } from './infrastructure/repositories/user/user-repository.provider';

@Module({
  controllers: [UserController],
  imports: [
    ClientFeatureModule,
    MongooseModule.forFeature([{ name: UserProfileModel.name, schema: UserProfileSchema }]),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }])
  ],
  providers: [
    UserRepositoryProvider,
    UserProfileRepositoryProvider,
    ValidateUserApplicationProvider
  ],
  exports: [
    UserRepositoryProvider,
    UserProfileRepositoryProvider,
    ValidateUserApplicationProvider

  ]
})
export class UserFeatureModule {}
