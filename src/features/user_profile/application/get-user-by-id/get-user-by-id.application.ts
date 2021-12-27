import { Injectable, Inject } from '@nestjs/common';
import { UserProfile } from '../../domain/entities/user.entity';
import { IUserProfileRepository } from '../../infrastructure/repositories/user-repository.interface';
import { UserProfileTypes } from '../../user.types';
import { IGetUserByIdApplication } from './get-user-by-id-app.interface';

@Injectable()
export class GetUserByIdApplication implements IGetUserByIdApplication {
  constructor(
    @Inject(UserProfileTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userProfileRepository: IUserProfileRepository,
  ) {}

  public execute(id: string): Promise<UserProfile> {
    return this.userProfileRepository.findById(id);
  }
}
