import { UserAuthTypes } from '../../auth.types';
import { UserConfirmApplication } from './user-confirm.application';

export const UserConfirmProvider = {
  provide: UserAuthTypes.APPLICATION.USER_CONFIRM,
  useClass: UserConfirmApplication,
};
