import { User } from '../../domain/entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  findOne(dni: any): Promise<User>;
  findOneUser(user: string): Promise<User>;
}
