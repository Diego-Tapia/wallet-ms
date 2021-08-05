import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerRequest: { name: string; password: string; email: string }) {
    return await this.authService.registerUser(registerRequest);
  }

  @Post('login')
  async login(@Body() authenticateRequest: { name: string; password: string }) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('confirm')
  async confirm(@Body() confirmRequest: { username: string; confirmationCode: string }) {
    try {
      return await this.authService.confirmUser(confirmRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
