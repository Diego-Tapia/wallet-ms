import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserAuthTypes } from '../../auth.types';
import { IUserAuthRegisterApplication } from './user-registrer.app.interface';
import { IUserAuthRepository } from '../../infrastructure/repositories/auth-user-repository.interface';
import { UserRegisterDTO } from '../../infrastructure/dto/user-register.dto';
import { Register } from '../../domain/entities/authRegisterUser.entity';
import { UserTypes } from 'src/features/user_profile/user.types';
import { IUserRepository } from 'src/features/user_profile/infrastructure/repositories/user-repository.interface';
import { UserProfile } from 'src/features/user_profile/domain/entities/user.entity';
import { User } from '../../domain/entities/user.entity';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';


@Injectable()
export class UserRegisterApplication implements IUserAuthRegisterApplication {
  constructor(
    @Inject(UserAuthTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userAuthRepository: IUserAuthRepository,
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserRepository,
    @InjectConnection()
    private readonly connection: Connection
  ) { }

  public async execute(userRegisterDto: UserRegisterDTO): Promise<any> {

    const session = await this.connection.startSession();

    try {
      session.startTransaction();
      const { client_id, email, password, dni, shortName, lastName, cuil, phoneNumber, avatar_url, username, custom_id } =
        userRegisterDto;

      const userExists = await this.userRepository.findOne(dni);

      if (userExists) {
        throw new ConflictException('DNI is already registered');
      }

      if (userExists === null) {
        const userRegister = new Register(username, email, password);
        await this.userAuthRepository.register(userRegister);

        const user = new User(
          custom_id,
          username,
          "PENDING_APPROVE",
          client_id

        )
        const userSaved = await this.userAuthRepository.create(user)

        const userProfile = new UserProfile(
          shortName,
          lastName,
          dni,
          cuil,
          email,
          avatar_url,
          phoneNumber,
          userSaved._id.toString()
        );
        await this.userRepository.create(userProfile);

        await session.commitTransaction();
        session.endSession();

      }

    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;

    }
    finally {
      session.endSession();
    }

  }

}
