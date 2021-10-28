import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { IUserRepository } from 'src/features/user_profile/infrastructure/repositories/user-repository.interface';
import { UserTypes } from 'src/features/user_profile/user.types';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';


@Injectable()
export class ValidateWalletToTransactionMiddleware implements NestMiddleware {

  constructor(
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}


  async use(req: Request<any, any, CreateTransactionDto>, res: Response, next: NextFunction) {
      // Request<P = core.ParamsDictionary, ResBody = any, ReqBody = any, ...>>
      // ¿Afecta en algo cambiar primer tipo de dato de Request? 
      // por defecto es: <P = core.ParamsDictionary, ...>
      // ¿existe otra manera de saltarse los dos primero y solo cambiar ReqBody?
    try {
      const dni  = req.body.dni;
      const walletTo = await this.userRepository.findOne(dni);
      if (!walletTo) throw new HttpException('user was not found', HttpStatus.NOT_FOUND);
      next();
    } catch (error) {
      const response = error.response || 'Validate WalletTo transaction';
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR; 
      throw new HttpException(response, status);
    }
  }
}
