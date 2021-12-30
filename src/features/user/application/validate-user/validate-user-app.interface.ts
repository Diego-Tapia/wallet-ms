import { RequestModel } from "src/features/auth/infrastructure/service/middleware/auth.middleware";
import { UserProfile } from "../../domain/entities/user-profile.entity";

export interface IValidateUserApplication {
  execute(userIdentifier: string, request: RequestModel): Promise<UserProfile>;
}
