import { UserConfirmDTO } from '../../infrastructure/dto/user-confirm.dto';

export interface IUserAuthConfirmApplication {
  execute(userConfirmDTO: UserConfirmDTO): any;
}
