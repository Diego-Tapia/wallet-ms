import { UserProfile } from 'src/features/user_profile/domain/entities/user.entity';
import { Confirm } from '../../domain/entities/authConfirmUser.entity';
import { Login } from '../../domain/entities/authLoginUser.entity';
import { Register } from '../../domain/entities/authRegisterUser.entity';
import { User } from '../../domain/entities/user.entity';
import { UserI } from '../interfaces/user.interface';

export interface IUserAuthRepository {
  register(userRegister: Register): any;
  confirm(userConfirm: Confirm): any;
  login(userLogin: Login): any;
  verifyJwt(jwt: string):Promise<any>;
  generateJwt(user: User): Promise<string>;
  create(user:User):Promise<User>;
  findById(id: string): Promise<User>
  findOne(user:any): Promise<User>;
  findOneByParams(param: string): Promise<User>
}
