import { UserProfile } from "../../domain/entities/user.entity";
import { CreateUserProfileDto } from "../../infrastructure/dtos/create-user.dto";


export interface ICreateUserApplication {
  execute(createUserDto: CreateUserProfileDto): Promise<UserProfile>;
}
