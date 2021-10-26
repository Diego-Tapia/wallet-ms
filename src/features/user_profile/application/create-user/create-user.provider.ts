import { UserTypes } from '../../user.types';
import { CreateUserApplication } from './create-user.application';

export const CreateUserApplicationProvider = {
  provide: UserTypes.APPLICATION.CREATE_USER,
  useClass: CreateUserApplication,
};
