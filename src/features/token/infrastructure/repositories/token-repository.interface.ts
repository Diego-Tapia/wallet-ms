import { Token } from '../../domain/entities/token.entity';

export interface ITokenRepository {
  findAll(): Promise<Token[]>;
  findById(id: string): Promise<Token>;
}
