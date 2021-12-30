import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { RequestModel } from 'src/features/auth/infrastructure/service/middleware/auth.middleware';
import { UserProfile } from '../../domain/entities/user-profile.entity';
import { User } from '../../domain/entities/user.entity';
import { EUserStatus } from '../../domain/enums/user.status.enum';
import { IUserProfileRepository } from '../../infrastructure/repositories/user-profile/user-profile-repository.interface';
import { IUserRepository } from '../../infrastructure/repositories/user/user-repository.interface';
import { UserTypes } from '../../user.types';
import { IValidateUserApplication } from './validate-user-app.interface';

@Injectable()
export class ValidateUserApplication implements IValidateUserApplication {
  constructor(
    @Inject(UserTypes.INFRASTRUCTURE.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(UserTypes.INFRASTRUCTURE.USER_PROFILE_REPOSITORY)
    private readonly userProfileRepository : IUserProfileRepository,
  ) {}

  public async execute(userIdentifier: string, request: RequestModel): Promise<UserProfile> {  
    const { clientId } = request.user;

    let userTemps: User[];
    let userProfiles: UserProfile[]
    
    const isNumber = !isNaN(Number(userIdentifier)); 
  
    if (isNumber) userProfiles = await this.userProfileRepository.findAll({ $or: [ { dni: +userIdentifier }, { cuil: +userIdentifier } ] }, { path: 'userId' })
    
    if (!userProfiles && !isNumber ) userTemps = await this.userRepository.findAll({ $or: [{ customId: userIdentifier }, { username: userIdentifier }] });

    const users =  userTemps || userProfiles?.map(user => user.userId as User)
    
    const user = users.find(user => user.clientId === clientId)
    
    if (!user || user.status !== EUserStatus.ACTIVE) throw new HttpException('Usuario invalido', HttpStatus.NOT_FOUND);
    
    const userProfile = await this.userProfileRepository.findOne({userId: user.id }, { path: 'userId' })
    if(!userProfile) throw new HttpException('Usuario invalido', HttpStatus.NOT_FOUND);

    return userProfile;
  }
}
