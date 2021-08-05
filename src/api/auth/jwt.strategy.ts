import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { passportJwtSecret } from 'jwks-rsa';
import { AuthConfig } from './auth.config';
import configs from 'src/configs/environments/configs';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(configs.KEY)
  private config: ConfigType<typeof configs>,
  private readonly authService: AuthService,
   
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${config.cognito.authority}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: config.cognito.authority,
      issuer: config.cognito.authority,
      algorithms: ['RS256'],
    });
  }

  public async validate(payload: any) {
    return !!payload.sub;
  }
}
