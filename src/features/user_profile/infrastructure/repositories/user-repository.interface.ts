import { UserProfile } from "../../domain/entities/user.entity";

export interface IUserRepository {
  create(user: any): Promise<any>;
  findAll(): Promise<UserProfile[]>;
  findById(id: string): Promise<UserProfile>;
  findOne(dni: any): Promise<UserProfile>;
  findOneUser(user: string): Promise<UserProfile>;
}
