import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../domain/entities/user.entity';
import { UserModel } from '../../infrastructure/models/user.model';
import { IUserRepository } from '../../infrastructure/repositories/user-repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {}

  public async create(user: User): Promise<User> {
    const savedUser = await new this.userModel(user).save();
    return this.toDomainEntity(savedUser);
  }

  public async findAll(): Promise<User[]> {
    const userModels = await this.userModel.find().exec();
    return userModels.map((user) => this.toDomainEntity(user));
  }

  public async findById(id: string): Promise<User> {
    const userModel = await this.userModel.findById(id).exec();
    return this.toDomainEntity(userModel);
  }

  public async findOne(dni: number): Promise<User> {
    const userModel = await this.userModel.findOne({ dni: dni }).exec();
    return userModel ? this.toDomainEntity(userModel) : null;
  }

  public async findOneUser(username: string): Promise<User> {
    const userModel = await this.userModel.findOne({ username: username }).exec();
    return userModel ? this.toDomainEntity(userModel) : null;
  }


  private toDomainEntity(model: UserModel): User {
    const { idWallet, dni, shortName, lastName, cuil, email, phoneNumber,username } = model;
    const userEntity = new User(
      idWallet.toString(),
      dni,
      shortName,
      lastName,
      cuil,
      email,
      phoneNumber.toString(),
      username
    );
    return userEntity;
  }
}
