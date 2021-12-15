import { Injectable, Inject } from '@nestjs/common';
import { RequestModel } from 'src/features/auth/infrastructure/service/middleware/auth.middleware';
import { UserProfile } from '../../domain/entities/user.entity';
import { CreateUserProfileDto } from '../../infrastructure/dtos/create-user.dto';
import { IUserRepository } from '../../infrastructure/repositories/user-repository.interface';
import { UserTypes } from '../../user.types';
import { ICreateUserApplication } from './create-user.app.interface';

@Injectable()
export class CreateUserApplication implements ICreateUserApplication {
  constructor(
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) { }

  public execute(createUserDto: CreateUserProfileDto, req: RequestModel): Promise<UserProfile> {
    const { userId, dni, shortName, lastName, cuil, avatarUrl, email, phoneNumber } = createUserDto;

    const user = new UserProfile(shortName, lastName, dni, cuil, avatarUrl, email, phoneNumber,userId);

    return this.userRepository.create(user);
  }
}
