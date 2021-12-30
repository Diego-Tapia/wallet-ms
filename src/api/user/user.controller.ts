import { Controller, Get, Inject, Param, Request, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { JwtAuthGuard } from "src/features/auth/infrastructure/guards/jwt-guards"
import { IValidateUserApplication } from "src/features/user/application/validate-user/validate-user-app.interface"
import { UserTypes } from "src/features/user/user.types"

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  
  constructor( 
    @Inject(UserTypes.APPLICATION.VALIDATE_USER)
    private readonly validateUserApplication: IValidateUserApplication
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('verify-user/:userIdentifier')
  verifyUser(@Param('userIdentifier') userIdentifier: string, @Request() request) {
    return this.validateUserApplication.execute(userIdentifier, request)
  }
}
