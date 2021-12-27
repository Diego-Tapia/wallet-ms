import { UserProfileTypes } from '../../user.types';
import { UserProfileRepository } from './user.repository';

export const UserProfileRepositoryProvider = {
  provide: UserProfileTypes.INFRASTRUCTURE.REPOSITORY,
  useClass: UserProfileRepository,
};
