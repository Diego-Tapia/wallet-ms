import { UserLoginDTO } from '../../infrastructure/dto/user-login.dto';

export interface IUserAuthLoginApplication {
  execute(userLoginDTO: UserLoginDTO): any;
}
