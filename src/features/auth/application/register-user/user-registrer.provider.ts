import { UserAuthTypes } from '../../auth.types';
import { UserRegisterApplication } from './user-registrer.application';

export const UserRegistrerProvider = {
  provide: UserAuthTypes.APPLICATION.USER_REGISTER,
  useClass: UserRegisterApplication,
};
