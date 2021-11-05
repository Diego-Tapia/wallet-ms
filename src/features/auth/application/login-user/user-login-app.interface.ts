import { UserLoginDTO } from '../../infrastructure/dto/user-login.dto';
import { AuthResponse } from '../../infrastructure/models/authResponse.entity';
export interface IUserAuthLoginApplication {
  execute(userLoginDTO: UserLoginDTO):Promise<AuthResponse>
}
