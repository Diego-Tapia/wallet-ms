import { UserAuthTypes } from '../../auth.types';
import { UserLoginApplication } from './user-login.application';

export const UserLoginProvider = {
  provide: UserAuthTypes.APPLICATION.USER_LOGIN,
  useClass: UserLoginApplication,
};
