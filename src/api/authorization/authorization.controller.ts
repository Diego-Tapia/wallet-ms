import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizationService } from './authorization.service';

@Controller()
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getMessage(): string {
    return this.authorizationService.getMessage();
  }
}
