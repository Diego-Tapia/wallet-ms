import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from '../../domain/entities/token.entity';
// import { CreateTokenDto } from '../dtos/create-token.dto';
import { TokenModel } from '../models/token.model';
import { ITokenRepository } from './token-repository.interface';

@Injectable()
export class TokenRepository implements ITokenRepository {
  constructor(@InjectModel(TokenModel.name) private readonly tokenModel: Model<TokenModel>) {}

  public create(token: Token): Promise<Token> {
    return new this.tokenModel(token).save();
  }

  public findAll(): Promise<Token[]> {
    return this.tokenModel.find().exec();
  }

  public findById(id: string): Promise<Token> {
    return this.tokenModel.findById(id).exec();
  }
}
