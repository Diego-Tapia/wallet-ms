import { User } from 'src/features/user/domain/entities/user.entity';
import { Confirm } from '../../domain/entities/authConfirmUser.entity';
import { Login } from '../../domain/entities/authLoginUser.entity';
import { Register } from '../../domain/entities/authRegisterUser.entity';

export interface IUserAuthRepository {
  register(userRegister: Register): any;
  confirm(userConfirm: Confirm): any;
  login(userLogin: Login): any;
  verifyJwt(jwt: string):Promise<any>;
  generateJwt(user: User): Promise<string>;
}
