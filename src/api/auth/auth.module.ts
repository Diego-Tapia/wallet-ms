import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthConfig } from './auth.config';
import { ConfigModule } from '@nestjs/config';
import configs from 'src/configs/environments/configs';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configs],
    isGlobal: true}),
    PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
