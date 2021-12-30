import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from '../../domain/entities/token.entity';
import { TokenModel } from '../models/token.model';
import { ITokenRepository } from './token-repository.interface';

@Injectable()
export class TokenRepository implements ITokenRepository {
  constructor(@InjectModel(TokenModel.name) private readonly tokenModel: Model<TokenModel>) { }

  public async findAll(): Promise<Token[]> {
    const models = await this.tokenModel.find().exec();
    return models.map((model) => Token.toEntity(model as TokenModel) as Token);
  }

  public async findById(id: string): Promise<Token> {
    const model = await this.tokenModel.findById(id).exec();
    return model ? Token.toEntity(model as TokenModel) as Token : null;
  }
}
