import { Injectable, Inject } from '@nestjs/common';
import { Token } from '../../domain/entities/token.entity';
import { CreateTokenDto } from '../../infrastructure/dtos/create-token.dto';
import { ITokenRepository } from '../../infrastructure/repositories/token-repository.interface';
import { TokenTypes } from '../../token.types';
import { ICreateTokenApplication } from './create-token-app.interface';

@Injectable()
export class CreateTokenApplication implements ICreateTokenApplication {
  constructor(
    @Inject(TokenTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly tokenRepository: ITokenRepository,
  ) { }

  public execute(createTokenDto: CreateTokenDto): Promise<Token> {
    const { shortName, symbol, price, money, bcItemId, operations, applicabilities, description, validFrom, validTo } = createTokenDto;

    const token = new Token(
      shortName,
      symbol,
      price,
      money,
      bcItemId,
      operations.toString(),
      applicabilities.toString(),
      description,
      validFrom.toString(),
      validTo,
    );

    return this.tokenRepository.create(token);
  }
}
