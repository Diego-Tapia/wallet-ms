import { ApiProperty } from '@nestjs/swagger';
import { UserProfile } from 'src/features/user/domain/entities/user-profile.entity';

export class AuthResponse {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: UserProfile
}
