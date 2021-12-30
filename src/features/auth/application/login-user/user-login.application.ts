import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import configs from 'src/configs/environments/configs';
import { ConfigType } from '@nestjs/config';
import { UserAuthTypes } from '../../auth.types';
import { UserLoginDTO } from '../../infrastructure/dto/user-login.dto';
import { IUserAuthRepository } from '../../infrastructure/repositories/auth-user-repository.interface';
import { IUserAuthLoginApplication } from './user-login-app.interface';
import { Login } from '../../domain/entities/authLoginUser.entity';
import { IUserProfileRepository } from 'src/features/user/infrastructure/repositories/user-profile/user-profile-repository.interface';
import { AuthResponse } from '../../domain/response/auth.response';
import { UserTypes } from 'src/features/user/user.types';
import { IUserRepository } from 'src/features/user/infrastructure/repositories/user/user-repository.interface';
import { User } from 'src/features/user/domain/entities/user.entity';
@Injectable()
export class UserLoginApplication implements IUserAuthLoginApplication {
  private userPool: CognitoUserPool;
  constructor(
    
    @Inject(configs.KEY)
    private config: ConfigType<typeof configs>,
    @Inject(UserAuthTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userAuthRepository: IUserAuthRepository,
    @Inject(UserTypes.INFRASTRUCTURE.USER_PROFILE_REPOSITORY)
    private readonly userProfileRepository: IUserProfileRepository,
    @Inject(UserTypes.INFRASTRUCTURE.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.config.cognito.user_pool,
      ClientId: this.config.cognito.client_id,
    });
  }

  public async execute(userLoginDTO: UserLoginDTO):Promise<AuthResponse>{
    const { username, password } = userLoginDTO;

    const payload: User = await this.userRepository.findOne({ username })
    if (!payload) throw new UnauthorizedException('Usuario o contraseña incorrecta')
    
    const login = new Login(username, password);
    await this.userAuthRepository.login(login);
    
    const token = await this.userAuthRepository.generateJwt(payload);
    const userProfile = await this.userProfileRepository.findOne({ userId: payload.id }, {path: 'userId'})
    return {
      token,
      user: userProfile
    }
  }
}
