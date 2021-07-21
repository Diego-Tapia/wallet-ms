import { Token } from '../../domain/entities/token.entity';
// import { CreateTokenDto } from '../dtos/create-token.dto';

export interface ITokenRepository {
  create(token: Token): Promise<Token>;
  findAll(): Promise<Token[]>;
  findById(id: string): Promise<Token>;
}
