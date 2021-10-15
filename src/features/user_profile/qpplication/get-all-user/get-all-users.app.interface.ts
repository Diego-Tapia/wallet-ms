import { User } from '../../domain/entities/user.entity';

export interface IGetAllUsersApplication {
  execute(): Promise<User[]>;
}
