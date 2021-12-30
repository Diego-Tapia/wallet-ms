import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, PopulateOptions } from "mongoose";
import { User } from "src/features/user/domain/entities/user.entity";
import { UserModel } from "../../models/user.model";
import { IUserRepository } from "./user-repository.interface";

@Injectable()
export class UserRepository implements IUserRepository {
  
  constructor(
    @InjectModel(UserModel.name) 
    private readonly userModel: Model<UserModel>) 
  { }

  
  public async create(user: User): Promise<User> {
    const savedUser = await new this.userModel(user).save();
    return User.toEntity(savedUser) as User;
  }

  public async findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<User> {
    const query = this.userModel.findById(id);

    if(options) query.populate(options);
    const model = await query.lean().exec();

    return model ? User.toEntity(model as UserModel) as User : null;
  }

  async findOne(filter: FilterQuery<UserModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<User> {
    const query = this.userModel.findOne(filter);

    if(options) query.populate(options);
    const model = await query.lean().exec();

    return model ? User.toEntity(model as UserModel) as User : null;
  }

  public async findAll(filter?: FilterQuery<UserModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<User[]> {
    const query = this.userModel.find(filter);

    if(options) query.populate(options);
    const models = await query.lean().exec();

    return models.map((model) => User.toEntity(model as UserModel) as User);
  }
}
