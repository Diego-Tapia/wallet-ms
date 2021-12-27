import { ApiProperty } from '@nestjs/swagger';
import { UserProfile } from 'src/features/user_profile/domain/entities/user.entity';

export class AuthResponse {
  @ApiProperty()
  token: string;

  @ApiProperty()
  userProfile: UserProfile
}
