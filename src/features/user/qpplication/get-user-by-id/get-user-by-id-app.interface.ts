import { User } from '../../domain/entities/user.entity';

export interface IGetUserByIdApplication {
  execute(id: string): Promise<User>;
}
