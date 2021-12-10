import { Inject, Injectable } from '@nestjs/common';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import configs from 'src/configs/environments/configs';
import { ConfigType } from '@nestjs/config';
import { UserAuthTypes } from '../../auth.types';
import { UserLoginDTO } from '../../infrastructure/dto/user-login.dto';
import { IUserAuthRepository } from '../../infrastructure/repositories/auth-user-repository.interface';
import { IUserAuthLoginApplication } from './user-login-app.interface';
import { Login } from '../../domain/entities/authLoginUser.entity';
import { JwtService } from '@nestjs/jwt';
import { UserI } from '../../infrastructure/interfaces/user.interface';
import { IUserRepository } from 'src/features/user_profile/infrastructure/repositories/user-repository.interface';
import { UserTypes } from 'src/features/user_profile/user.types';
import { AuthResponse } from '../../infrastructure/models/authResponse.model';
@Injectable()
export class UserLoginApplication implements IUserAuthLoginApplication {
  private userPool: CognitoUserPool;
  constructor(
    
    @Inject(configs.KEY)
    private config: ConfigType<typeof configs>,
    @Inject(UserAuthTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userAuthRepository: IUserAuthRepository,
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserRepository,
    
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.config.cognito.user_pool,
      ClientId: this.config.cognito.client_id,
    });
  }

  public async execute(userLoginDTO: UserLoginDTO):Promise<AuthResponse>{
    const { username, password } = userLoginDTO;
    const login = new Login(username, password);

    await this.userAuthRepository.login(login);
    
    const payload: any = await this.userAuthRepository.findOne(username)
    const token = await this.userAuthRepository.generateJwt(payload);
    return {token}
  }
}
