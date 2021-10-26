import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileModel, UserProfileSchema } from './infrastructure/models/user-profile.model';

import { UserRepositoryProvider } from './infrastructure/repositories/user-repository.provider';
import { CreateUserApplicationProvider } from './application/create-user/create-user.provider';
import { GetAllUsersApplicationProvider } from './application/get-all-user/get-all-users.provider';
import { GetUserByIdApplicationProvider } from './application/get-user-by-id/get-user-by-id.provider';

@Module({
  controllers: [],
  imports: [MongooseModule.forFeature([{ name: UserProfileModel.name, schema: UserProfileSchema }])],
  providers: [
    UserRepositoryProvider,
    CreateUserApplicationProvider,
    GetAllUsersApplicationProvider,
    GetUserByIdApplicationProvider,
  ],
})
export class UserFeatureModule {}
