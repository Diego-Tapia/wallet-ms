import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserAuthTypes } from 'src/features/auth/auth.types';
import { IUserRepository } from 'src/features/user/infrastructure/repositories/user-repository.interface';
import { UserTypes } from 'src/features/user/user.types';
import { UserI } from '../../interfaces/user.interface';
import { IUserAuthRepository } from '../../repositories/auth-user-repository.interface';

export interface RequestModel extends Request {
    user: UserI
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
        private readonly userRepository: IUserRepository,
        @Inject(UserAuthTypes.INFRASTRUCTURE.REPOSITORY)
        private readonly userAuthRepository: IUserAuthRepository) { }

    async use(req: RequestModel, res: Response, next: NextFunction) {
        try {
            const tokenArray: string[] = req.headers['authorization'].split(' ');
            const decodedToken = await this.userAuthRepository.verifyJwt(tokenArray[1]);

            const user: UserI = await this.userRepository.findOne(decodedToken.user.dni);
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