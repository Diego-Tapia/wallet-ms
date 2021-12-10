import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from '../../domain/entities/token.entity';
// import { CreateTokenDto } from '../dtos/create-token.dto';
import { TokenModel } from '../models/token.model';
import { ITokenRepository } from './token-repository.interface';

@Injectable()
export class TokenRepository implements ITokenRepository {
  constructor(@InjectModel(TokenModel.name) private readonly tokenModel: Model<TokenModel>) { }

  public async create(token: Token): Promise<Token> {
    const savedToken = await new this.tokenModel(token).save();
    return this.toDomainEntity(savedToken);
  }

  public async findAll(): Promise<Token[]> {
    const tokensModels = await this.tokenModel.find().exec();
    return tokensModels.map((token) => this.toDomainEntity(token));
  }

  public async findById(id: string): Promise<Token> {
    const tokenModel = await this.tokenModel.findById(id).exec();
    return this.toDomainEntity(tokenModel);
  }



  private toDomainEntity(model: TokenModel): Token {
    const { shortName, symbol, price, money, status, bc_item_id, applicabilities, operations, description, validFrom, validTo } = model;
    const transactionEntity = new Token(
      shortName,
      symbol,
      price,
      money,
      status,
      bc_item_id,
      applicabilities.toString(),
      operations.toString(),
      description,
      validFrom,
      validTo,
    );
    return transactionEntity;
  }
}
