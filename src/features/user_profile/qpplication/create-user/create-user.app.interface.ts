import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../infrastructure/dtos/create-user.dto';

export interface ICreateUserApplication {
  execute(createUserDto: CreateUserDto): Promise<User>;
}
