import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/api/user/user.controller';
import { UserModel, UserSchema } from './infrastructure/models/user.model';
import { UserRepositoryProvider } from './infrastructure/repositories/user-repository.provider';
import { CreateUserApplicationProvider } from './qpplication/create-user/create-user.provider';
import { GetAllUsersApplicationProvider } from './qpplication/get-all-user/get-all-users.provider';
import { GetUserByIdApplicationProvider } from './qpplication/get-user-by-id/get-user-by-id.provider';

@Module({
  controllers: [UserController],
  imports: [MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }])],
  providers: [
    UserRepositoryProvider,
    CreateUserApplicationProvider,
    GetAllUsersApplicationProvider,
    GetUserByIdApplicationProvider,
  ],
})
export class UserFeatureModule {}
