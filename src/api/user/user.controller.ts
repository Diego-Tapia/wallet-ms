import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserProfileDto } from 'src/features/user_profile/infrastructure/dtos/create-user.dto';
import { ICreateUserApplication } from 'src/features/user_profile/qpplication/create-user/create-user.app.interface';
import { IGetAllUsersApplication } from 'src/features/user_profile/qpplication/get-all-user/get-all-users.app.interface';
import { IGetUserByIdApplication } from 'src/features/user_profile/qpplication/get-user-by-id/get-user-by-id-app.interface';
import { UserTypes } from 'src/features/user_profile/user.types';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    @Inject(UserTypes.APPLICATION.CREATE_USER)
    private readonly createUserApplication: ICreateUserApplication,
    @Inject(UserTypes.APPLICATION.GET_ALL_USERS)
    private readonly getAllUsersApplication: IGetAllUsersApplication,
    @Inject(UserTypes.APPLICATION.GET_USER_BY_ID)
    private readonly getUserByIdApplication: IGetUserByIdApplication,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserProfileDto) {
    return this.createUserApplication.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.getAllUsersApplication.execute();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.getUserByIdApplication.execute(id);
  }
}
