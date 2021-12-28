import { Controller, Get, Inject, Param, Request, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { JwtAuthGuard } from "src/features/auth/infrastructure/guards/jwt-guards"
import { IValidateUserApplication } from "src/features/user_profile/application/validate-user/validate-user-app.interface"
import { UserProfileTypes } from "src/features/user_profile/user.types"

@ApiTags('user profile')
@Controller('user-profile')
@ApiBearerAuth()
export class UserProfileController {
  
  constructor( 
    @Inject(UserProfileTypes.APPLICATION.VALIDATE_USER_PROFILE)
    private readonly validateUser: IValidateUserApplication
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('verify-user/:userIdentifier')
  verifyUser(@Param('userIdentifier') userIdentifier: string, @Request() request) {
    return this.validateUser.execute(userIdentifier, request)
  }
}
