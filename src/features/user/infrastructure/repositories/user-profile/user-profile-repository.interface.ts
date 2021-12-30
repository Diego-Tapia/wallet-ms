import { FilterQuery, PopulateOptions } from "mongoose";
import { UserProfile } from "../../../domain/entities/user-profile.entity";
import { UserProfileModel } from "../../models/user-profile.model";

export interface IUserProfileRepository {
  create(user: any): Promise<any>;
  findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<UserProfile>;
  findOne(filter: FilterQuery<UserProfileModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<UserProfile>; 
  findAll(filter?: FilterQuery<UserProfileModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<UserProfile[]>;
}
