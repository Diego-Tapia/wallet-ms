import { FilterQuery, PopulateOptions } from 'mongoose';
import { User } from 'src/features/user/domain/entities/user.entity';
import { UserModel } from '../../models/user.model';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<User>;
  findOne(filter: FilterQuery<UserModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<User>;
  findAll(filter?: FilterQuery<UserModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<User[]>;
}
