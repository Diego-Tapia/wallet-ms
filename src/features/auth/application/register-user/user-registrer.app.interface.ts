import { UserRegisterDTO } from '../../infrastructure/dto/user-register.dto';

export interface IUserAuthRegisterApplication {
  execute(userRegisterDTO: UserRegisterDTO): any;
}
