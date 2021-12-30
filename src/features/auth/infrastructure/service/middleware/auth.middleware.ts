import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserAuthTypes } from 'src/features/auth/auth.types';
import { User } from 'src/features/user/domain/entities/user.entity';
import { IUserRepository } from 'src/features/user/infrastructure/repositories/user/user-repository.interface';
import { UserTypes } from 'src/features/user/user.types';
import { IUserAuthRepository } from '../../repositories/auth-user-repository.interface';

export interface RequestModel extends Request {
    user: User
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        @Inject(UserAuthTypes.INFRASTRUCTURE.REPOSITORY)
        private readonly userAuthRepository: IUserAuthRepository,
        @Inject(UserTypes.INFRASTRUCTURE.USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
    ) { }

    async use(req: RequestModel, res: Response, next: NextFunction) {
        try {
            const tokenArray: string[] = req.headers['authorization'].split(' ');
            const decodedToken = await this.userAuthRepository.verifyJwt(tokenArray[1]);

            const user: User = await this.userRepository.findOne({username: decodedToken.user.username});
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