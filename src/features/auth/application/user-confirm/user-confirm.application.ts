import { Inject, Injectable } from '@nestjs/common';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import configs from 'src/configs/environments/configs';
import { ConfigType } from '@nestjs/config';
import { UserAuthTypes } from '../../auth.types';
import { IUserAuthConfirmApplication } from './user-confirm-app.interface';
import { UserConfirmDTO } from '../../infrastructure/dto/user-confirm.dto';
import { Confirm } from '../../domain/entities/authConfirmUser.entity';
import { IUserAuthRepository } from '../../infrastructure/repositories/auth-user-repository.interface';

@Injectable()
export class UserConfirmApplication implements IUserAuthConfirmApplication {
  private userPool: CognitoUserPool;
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(
    @Inject(configs.KEY)
    private config: ConfigType<typeof configs>,
    @Inject(UserAuthTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userAuthRepository: IUserAuthRepository,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.config.cognito.user_pool,
      ClientId: this.config.cognito.client_id,
    });
  }

  public async execute(userConfirmDTO: UserConfirmDTO): Promise<any> {
    const { username, confirmCode } = userConfirmDTO;

    const UserConfirm = new Confirm(username, confirmCode);

    await this.userAuthRepository.confirm(UserConfirm);
  }
}
