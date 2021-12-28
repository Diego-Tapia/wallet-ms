import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { UserAuthTypes } from 'src/features/auth/auth.types';
import { User } from 'src/features/auth/domain/entities/user.entity';
import { IUserAuthRepository } from 'src/features/auth/infrastructure/repositories/auth-user-repository.interface';
import { RequestModel } from 'src/features/auth/infrastructure/service/middleware/auth.middleware';
import { UserProfile } from '../../domain/entities/user.entity';
import { IUserProfileRepository } from '../../infrastructure/repositories/user-repository.interface';
import { UserProfileTypes } from '../../user.types';
import { IValidateUserApplication } from './validate-user-app.interface';

@Injectable()
export class ValidateUserApplication implements IValidateUserApplication {
  constructor(
    @Inject(UserAuthTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userAuthRepository: IUserAuthRepository,
    @Inject(UserProfileTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userProfileRepository : IUserProfileRepository,
  ) {}

  public async execute(userIdentifier: string, request: RequestModel): Promise<UserProfile> {  
    const { clientId } = request.user;

    let userTemp: User;
    let userProfile: UserProfile
    
    const isNumber = !isNaN(Number(userIdentifier)); 
  
    if (isNumber) userProfile = await this.userProfileRepository.findOneByParams(+userIdentifier)
    
    if (!userProfile && !isNumber ) userTemp = await this.userAuthRepository.findOneByParams(userIdentifier);

    const user =  userTemp || userProfile?.userId as User
    if (!user) throw new HttpException('No se encontró ningun usuario con esa identificación', HttpStatus.NOT_FOUND);
    if(user.clientId !== clientId) throw new HttpException('No se encontró ningun usuario con esa identificación', HttpStatus.NOT_FOUND);
    
    userProfile = await this.userProfileRepository.findOneQueryAndPopulate({ userId: user.id })
    if(!userProfile) throw new HttpException('No se encontró ningun usuario con esa identificación', HttpStatus.NOT_FOUND);

    return userProfile;
  }
}
