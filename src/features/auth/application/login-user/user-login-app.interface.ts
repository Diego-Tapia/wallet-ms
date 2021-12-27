import { AuthResponse } from '../../domain/response/auth.response';
import { UserLoginDTO } from '../../infrastructure/dto/user-login.dto';
export interface IUserAuthLoginApplication {
  execute(userLoginDTO: UserLoginDTO):Promise<AuthResponse>
}
