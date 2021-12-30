import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserAuthTypes } from '../../auth.types';
import { IUserAuthRegisterApplication } from './user-registrer.app.interface';
import { IUserAuthRepository } from '../../infrastructure/repositories/auth-user-repository.interface';
import { UserRegisterDTO } from '../../infrastructure/dto/user-register.dto';
import { Register } from '../../domain/entities/authRegisterUser.entity';
import { UserTypes } from 'src/features/user/user.types';
import { IUserProfileRepository } from 'src/features/user/infrastructure/repositories/user-profile/user-profile-repository.interface';
import { UserProfile } from 'src/features/user/domain/entities/user-profile.entity';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { WalletTypes } from 'src/features/wallet/wallet.type';
import { IWalletRepository } from 'src/features/wallet/infrastructure/repositories/wallet-repository.interface';
import { Wallet } from 'src/features/wallet/domain/entities/wallet.entity';
import { IUserRepository } from 'src/features/user/infrastructure/repositories/user/user-repository.interface';
import { User } from 'src/features/user/domain/entities/user.entity';
import { EUserStatus } from 'src/features/user/domain/enums/user.status.enum';


@Injectable()
export class UserRegisterApplication implements IUserAuthRegisterApplication {
  constructor(
    @Inject(UserAuthTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userAuthRepository: IUserAuthRepository,
    @Inject(UserTypes.INFRASTRUCTURE.USER_PROFILE_REPOSITORY)
    private readonly userProfileRepository: IUserProfileRepository,
    @Inject(UserTypes.INFRASTRUCTURE.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
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

      const userExists = await this.userProfileRepository.findOne({dni});

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
          status: EUserStatus.PENDING_APPROVE,
          clientId,
          walletId: wallet.id          
        })

        const userSaved = await this.userRepository.create(user)

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
