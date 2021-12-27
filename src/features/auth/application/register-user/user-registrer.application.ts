import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserAuthTypes } from '../../auth.types';
import { IUserAuthRegisterApplication } from './user-registrer.app.interface';
import { IUserAuthRepository } from '../../infrastructure/repositories/auth-user-repository.interface';
import { UserRegisterDTO } from '../../infrastructure/dto/user-register.dto';
import { Register } from '../../domain/entities/authRegisterUser.entity';
import { UserProfileTypes } from 'src/features/user_profile/user.types';
import { IUserProfileRepository } from 'src/features/user_profile/infrastructure/repositories/user-repository.interface';
import { UserProfile } from 'src/features/user_profile/domain/entities/user.entity';
import { User } from '../../domain/entities/user.entity';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { WalletTypes } from 'src/features/wallet/wallet.type';
import { IWalletRepository } from 'src/features/wallet/infrastructure/repositories/wallet-repository.interface';
import { Wallet } from 'src/features/wallet/domain/entities/wallet.entity';


@Injectable()
export class UserRegisterApplication implements IUserAuthRegisterApplication {
  constructor(
    @Inject(UserAuthTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userAuthRepository: IUserAuthRepository,
    @Inject(UserProfileTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userProfileRepository: IUserProfileRepository,
    @InjectConnection()
    private readonly connection: Connection,
    @Inject(WalletTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository: IWalletRepository
  ) { }

  public async execute(userRegisterDto: UserRegisterDTO): Promise<any> {

    const session = await this.connection.startSession();

    try {
      session.startTransaction();
      const { clientId, email, password, dni, shortName, lastName, cuil, phoneNumber, avatarUrl, username, customId } =
        userRegisterDto;

      const userExists = await this.userProfileRepository.findOne(dni);

      if (userExists) {
        throw new ConflictException('DNI is already registered');
      }

      if (userExists === null) {
        const userRegister = new Register(username, email, password);

        const newWallet = new Wallet({
          address: 'address_1',
          privateKey: 'privateKey_1',
        })
        
        const wallet = await this.walletRepository.create(newWallet)

        await this.userAuthRepository.register(userRegister);

        const user = new User({
          customId,
          username,
          status: "PENDING_APPROVE",
          clientId,
          walletId: wallet.id          
        })

        const userSaved = await this.userAuthRepository.create(user)

        const userProfile = new UserProfile({
          shortName,
          lastName,
          dni,
          cuil,
          email,
          avatarUrl,
          phoneNumber,
          userId: userSaved.id}
        );
        
        await this.userProfileRepository.create(userProfile);

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
