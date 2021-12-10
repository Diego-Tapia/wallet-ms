import { UserLoginDTO } from '../../infrastructure/dto/user-login.dto';
import { AuthResponse } from '../../infrastructure/models/authResponse.model';
export interface IUserAuthLoginApplication {
  execute(userLoginDTO: UserLoginDTO):Promise<AuthResponse>
}
