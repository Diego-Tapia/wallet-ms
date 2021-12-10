import { BadRequestException, Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IUserAuthLoginApplication } from 'src/features/auth/application/login-user/user-login-app.interface';
import { IUserAuthRegisterApplication } from 'src/features/auth/application/register-user/user-registrer.app.interface';
import { IUserAuthConfirmApplication } from 'src/features/auth/application/user-confirm/user-confirm-app.interface';
import { UserAuthTypes } from 'src/features/auth/auth.types';
import { UserConfirmDTO } from 'src/features/auth/infrastructure/dto/user-confirm.dto';
import { UserLoginDTO } from 'src/features/auth/infrastructure/dto/user-login.dto';
import { UserRegisterDTO } from 'src/features/auth/infrastructure/dto/user-register.dto';
import { AuthResponse } from 'src/features/auth/infrastructure/models/authResponse.model';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UserAuthTypes.APPLICATION.USER_REGISTER)
    private readonly userAuthRegisterApplication: IUserAuthRegisterApplication,
    @Inject(UserAuthTypes.APPLICATION.USER_CONFIRM)
    private readonly userAuthConfirmApplication: IUserAuthConfirmApplication,
    @Inject(UserAuthTypes.APPLICATION.USER_LOGIN)
    private readonly userAuthLoginApplication: IUserAuthLoginApplication,
  ) {}

  @Post('register')
  async register(@Body() userRegisterDTO: UserRegisterDTO) {
    try {
      return await this.userAuthRegisterApplication.execute(userRegisterDTO);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  //{success:true or false , message: "ok",data:[],info:{page:0 offset:0 count:0 limit:0}}
  @Post('confirm')
  async confirm(@Body() userConfirmDTO: UserConfirmDTO) {
    try {
      return await this.userAuthConfirmApplication.execute(userConfirmDTO);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('login')
  @ApiResponse({status:201, description: 'Retorna el token que se utiliza para accceder las rutas', type: AuthResponse})
  async login(@Body() userLoginDTO: UserLoginDTO) {
    try {
      return await this.userAuthLoginApplication.execute(userLoginDTO);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
