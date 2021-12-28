import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileModel, UserProfileSchema } from './infrastructure/models/user-profile.model';

import { UserProfileRepositoryProvider } from './infrastructure/repositories/user-repository.provider';
import { CreateUserApplicationProvider } from './application/create-user/create-user.provider';
import { GetAllUsersApplicationProvider } from './application/get-all-user/get-all-users.provider';
import { GetUserByIdApplicationProvider } from './application/get-user-by-id/get-user-by-id.provider';
import { ValidateUserApplicationProvider } from './application/validate-user/validate-user.provider';
import { UserProfileController } from 'src/api/user_profile/user-profile.controller';
import { AuthFeatureModule } from '../auth/auth.module';

@Module({
  controllers: [UserProfileController],
  imports: [
    AuthFeatureModule,
    MongooseModule.forFeature([{ name: UserProfileModel.name, schema: UserProfileSchema }])
  ],
  providers: [
    UserProfileRepositoryProvider,
    CreateUserApplicationProvider,
    GetAllUsersApplicationProvider,
    GetUserByIdApplicationProvider,
    ValidateUserApplicationProvider
  ],
})
export class UserProfileFeatureModule {}
