import { UserAuthTypes } from '../../auth.types';
import { UserAuthRepository } from './auth-user.repository';

export const UserAuthRepositoryProvider = {
  provide: UserAuthTypes.INFRASTRUCTURE.REPOSITORY,
  useClass: UserAuthRepository,
};
