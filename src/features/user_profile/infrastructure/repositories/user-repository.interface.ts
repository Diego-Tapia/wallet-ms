import { FilterQuery } from "mongoose";
import { UserProfile } from "../../domain/entities/user.entity";
import { UserProfileModel } from "../models/user-profile.model";

export interface IUserProfileRepository {
  create(user: any): Promise<any>;
  findAll(): Promise<UserProfile[]>;
  findById(id: string): Promise<UserProfile>;
  findOne(dni: any): Promise<UserProfile>;
  findOneUser(user: string): Promise<UserProfile>;
  findOneByParams(param: number): Promise<UserProfile>;
  findOneQueryAndPopulate(filter: FilterQuery<UserProfileModel>): Promise<UserProfile>
}
