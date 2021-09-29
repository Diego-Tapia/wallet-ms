import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../infrastructure/dtos/create-user.dto';
import { IUserRepository } from '../../infrastructure/repositories/user-repository.interface';
import { UserTypes } from '../../user.types';
import { ICreateUserApplication } from './create-user.app.interface';

@Injectable()
export class CreateUserApplication implements ICreateUserApplication {
  constructor(
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  public execute(createUserDto: CreateUserDto): Promise<User> {
    const { idWallet, dni, shortName, lastName, cuil, email, phoneNumber,username } = createUserDto;

    const user = new User(idWallet, dni, shortName, lastName, cuil, email, phoneNumber,username);

    return this.userRepository.create(user);
  }
}
