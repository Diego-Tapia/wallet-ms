import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserAuthTypes } from 'src/features/auth/auth.types';
import { User } from 'src/features/auth/domain/entities/user.entity';
import { IUserProfileRepository } from 'src/features/user_profile/infrastructure/repositories/user-repository.interface';
import { UserProfileTypes } from 'src/features/user_profile/user.types';
import { IUserAuthRepository } from '../../repositories/auth-user-repository.interface';

export interface RequestModel extends Request {
    user: User
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        @Inject(UserProfileTypes.INFRASTRUCTURE.REPOSITORY)
        private readonly userRepository: IUserProfileRepository,
        @Inject(UserAuthTypes.INFRASTRUCTURE.REPOSITORY)
        private readonly userAuthRepository: IUserAuthRepository) { }

    async use(req: RequestModel, res: Response, next: NextFunction) {
        try {
            const tokenArray: string[] = req.headers['authorization'].split(' ');
            const decodedToken = await this.userAuthRepository.verifyJwt(tokenArray[1]);

            const user: User = await this.userAuthRepository.findOne(decodedToken.user.username);
            if (user) {
                req.user = user;
                next();
            } else {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }
        } catch {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

}