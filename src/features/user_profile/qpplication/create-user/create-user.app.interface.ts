import { RequestModel } from "src/features/auth/infrastructure/service/middleware/auth.middleware";
import { UserProfile } from "../../domain/entities/user.entity";
import { CreateUserProfileDto } from "../../infrastructure/dtos/create-user.dto";


export interface ICreateUserApplication {
  execute(createUserDto: CreateUserProfileDto,req:RequestModel): Promise<UserProfile>;
}
