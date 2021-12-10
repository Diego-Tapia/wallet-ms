import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable} from '@nestjs/common';
import configs from 'src/configs/environments/configs';
import { ConfigType } from '@nestjs/config';
import { RequestModel } from './middleware/auth.middleware';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(configs.KEY)
    config: ConfigType<typeof configs>
  ) {
    super({
      secretOrKey: config.secret.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: RequestModel) {
    return { ...payload.user };
  }
}
