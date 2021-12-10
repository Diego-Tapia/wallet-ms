import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserProfile } from '../../domain/entities/user.entity';
import { IUserRepository } from './user-repository.interface';
import { UserProfileModel } from '../models/user-profile.model';
import { User } from 'src/features/auth/domain/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(UserProfileModel.name) private readonly userModel: Model<UserProfileModel>) { }

  public async create(user: UserProfile): Promise<UserProfile> {
    const savedUser = await new this.userModel(user).save();
    return this.toDomainEntity(savedUser);
  }

  public async findAll(): Promise<UserProfile[]> {
    const userModels = await this.userModel.find().exec();
    return userModels.map((user) => this.toDomainEntity(user));
  }

  public async findById(id: string): Promise<UserProfile> {
    const userModel = await this.userModel.findById(id).exec();
    return this.toDomainEntity(userModel);
  }

  public async findOne(dni: number): Promise<UserProfile> {
    const userModel = await this.userModel.findOne({ dni: dni }).exec();
    return userModel ? this.toDomainEntity(userModel) : null;
  }

  public async findOneUser(username: string): Promise<UserProfile> {
    const userModel = await this.userModel.findOne({ username: username }).exec();
    return userModel ? this.toDomainEntity(userModel) : null;
  }

  private toDomainEntity(model: UserProfileModel):UserProfile{
    const { user_id,shortName, lastName, dni, cuil, avatar_url, email, phoneNumber } = model;
    const userEntity = new UserProfile(
      shortName,
      lastName,
      dni,
      cuil,
      avatar_url,
      email,
      phoneNumber,
      user_id.toString()
    );
    return userEntity;
  }
}
