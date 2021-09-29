import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserAuthTypes } from '../../auth.types';
import { IUserAuthRegisterApplication } from './user-registrer.app.interface';
import { IUserAuthRepository } from '../../infrastructure/repositories/auth-user-repository.interface';
import { UserRegisterDTO } from '../../infrastructure/dto/user-register.dto';
import { IUserRepository } from 'src/features/user/infrastructure/repositories/user-repository.interface';
import { UserTypes } from 'src/features/user/user.types';
import { IWalletRepository } from 'src/features/wallet/infrastructure/repositories/wallet-repository.interface';
import { Wallet } from 'src/features/wallet/domain/entities/wallet.entity';
import { User } from 'src/features/user/domain/entities/user.entity';
import { Register } from '../../domain/entities/authRegisterUser.entity';
let mongoose = require('mongoose');


@Injectable()
export class UserRegisterApplication implements IUserAuthRegisterApplication {
  constructor(
    @Inject(UserAuthTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userAuthRepository: IUserAuthRepository,
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository: IWalletRepository,
  ) {}

  public async execute(userRegisterDto: UserRegisterDTO): Promise<any> {
    const { username, email, password, dni, shortName, lastName, cuil, phoneNumber } =
      userRegisterDto;

    const userRegister = new Register(username, email, password);

    const userExists = await this.userRepository.findOne(dni);

    if (userExists) {
      throw new ConflictException('DNI is already registered');
    }

    if (userExists === null) {
      await this.userAuthRepository.register(userRegister);

      //falta el llamado a la api de Blockchain para crear una wallet, asi que genero id de mongo randoms para las wallets
      let id = new mongoose.Types.ObjectId();
      
      const user = new User(
        id.toString(),
        dni,
        shortName,
        lastName,
        cuil,
        email,
        phoneNumber,
        username
      );
      await this.userRepository.create(user);
    }
  }
}
