import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserProfile } from '../../domain/entities/user.entity';
import { UserProfileModel } from '../models/user-profile.model';
import { User } from 'src/features/auth/domain/entities/user.entity';
import { UserModel } from 'src/features/auth/infrastructure/models/user.model';
import { IUserProfileRepository } from './user-repository.interface';

@Injectable()
export class UserProfileRepository implements IUserProfileRepository {
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

  // POPULATE
  public async findOneByParams(param: number): Promise<UserProfile> {
    const userModel = await this.userModel
      .findOne( { $or: [ { dni: param }, { cuil: param } ] } )
      .populate({path: 'userId'})
      .exec();
    return userModel ? this.toDomainEntityAndPopulate(userModel) : null;
  }

  public async findOneQueryAndPopulate(filter: FilterQuery<UserProfileModel>): Promise<UserProfile> {
    const userModel = await this.userModel.findOne({ ...filter })
      .populate({path: 'userId'})
      .exec();
    return userModel ? this.toDomainEntityAndPopulate(userModel) : null;
  }

  private toDomainEntity(model: UserProfileModel):UserProfile{
    const { shortName, lastName, dni, cuil, avatarUrl, email, phoneNumber, userId, _id, createdAt, updatedAt } = model;
    const userEntity = new UserProfile({
      shortName,
      lastName,
      dni,
      cuil,
      avatarUrl,
      email,
      phoneNumber,
      userId: userId.toString(),
      id: _id.toString(),
      createdAt,
      updatedAt
    });
    return userEntity;
  }

  private toDomainEntityAndPopulate(model: UserProfileModel):UserProfile{
    const { shortName, lastName, dni, cuil, avatarUrl, email, phoneNumber, userId, _id, createdAt, updatedAt } = model;
    const userEntity = new UserProfile({
      shortName,
      lastName,
      dni,
      cuil,
      avatarUrl,
      email,
      phoneNumber,
      userId: this.toEntityUser(userId as UserModel),
      id: _id.toString(),
      createdAt,
      updatedAt
    });
    return userEntity;
  }

  private toEntityUser(model: UserModel): User {
    const { customId, username, status, _id, clientId, walletId } = model;
    const userEntity = new User({
      customId,
      username,
      status,
      clientId: clientId.toString(),
      id: _id.toString(),
      walletId: walletId.toString(),
    });
    return userEntity;
  }
}
