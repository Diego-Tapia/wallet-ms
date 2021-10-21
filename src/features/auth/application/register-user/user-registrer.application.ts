import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserAuthTypes } from '../../auth.types';
import { IUserAuthRegisterApplication } from './user-registrer.app.interface';
import { IUserAuthRepository } from '../../infrastructure/repositories/auth-user-repository.interface';
import { UserRegisterDTO } from '../../infrastructure/dto/user-register.dto';
import { IWalletRepository } from 'src/features/wallet/infrastructure/repositories/wallet-repository.interface';
import { Wallet } from 'src/features/wallet/domain/entities/wallet.entity';
import { Register } from '../../domain/entities/authRegisterUser.entity';
import { UserTypes } from 'src/features/user_profile/user.types';
import { IUserRepository } from 'src/features/user_profile/infrastructure/repositories/user-repository.interface';
import { UserProfile } from 'src/features/user_profile/domain/entities/user.entity';
import { User } from '../../domain/entities/user.entity';
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
  ) { }

  public async execute(userRegisterDto: UserRegisterDTO): Promise<any> {
    const { email, password, dni, shortName, lastName, cuil, phoneNumber, avatar_url, username, custom_id } =
      userRegisterDto;

    const userExists = await this.userRepository.findOne(dni);

    if (userExists) {
      throw new ConflictException('DNI is already registered');
    }

    if (userExists === null) {
      const userRegister = new Register(username, email, password);
      await this.userAuthRepository.register(userRegister);

   const newWallet = {
        "address": "address",
        "privateKey": "key"
      }
      
      /* const wallet_id = await this.walletRepository.create(newWallet)  */
      const client_id = new mongoose.Types.ObjectId();
      const wallet_id = new mongoose.Types.ObjectId(); 
      const user_id = new mongoose.Types.ObjectId();
 
      
      
      const user = new User(
        custom_id,
        username,
        "PENDING",
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

    }
  }
}
