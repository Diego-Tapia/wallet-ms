import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import configs from 'src/configs/environments/configs';
import { Confirm } from '../../domain/entities/authConfirmUser.entity';
import { Login } from '../../domain/entities/authLoginUser.entity';
import { Register } from '../../domain/entities/authRegisterUser.entity';
import { UserI } from '../interfaces/user.interface';
import { IUserAuthRepository } from './auth-user-repository.interface';

@Injectable()
export class UserAuthRepository implements IUserAuthRepository {
  private userPool: CognitoUserPool;
  constructor(
    @Inject(configs.KEY)
    private config: ConfigType<typeof configs>,
    private readonly jwtService: JwtService
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.config.cognito.user_pool,
      ClientId: this.config.cognito.client_id,
    });
  }



  public register(register: Register): Promise<any> {
    const username = register.username;
    const email = register.email;
    const password = register.password;

    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        username,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  public confirm(confirm: Confirm) {
    const username = confirm.usarname;
    const confirmCode = confirm.confirmCode;

    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(confirmCode, true, function (err, result) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async login(login: Login): Promise<any> {
    const username = login.username;
    const password = login.password;

    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return await new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async generateJwt(user: UserI): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

  public verifyJwt(jwt: string): Promise<any> {
    return this.jwtService.verifyAsync(jwt);
  }

}
