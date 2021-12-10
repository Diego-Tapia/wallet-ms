import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateTokenApplicationProvider } from './application/create-token/create-token.provider';
import { GetAllTokensApplicationProvider } from './application/get-all-tokens/get-all-tokens.provider';
import { GetTokenByIdApplicationProvider } from './application/get-token-by-id/get-token-by-id.provider';
import { TokenModel, TokenSchema } from './infrastructure/models/token.model';
import { TokenRepositoryProvider } from './infrastructure/repositories/token-repository.provider';

@Module({
  controllers: [],
  imports: [MongooseModule.forFeature([{ name: TokenModel.name, schema: TokenSchema }])],
  providers: [
    TokenRepositoryProvider,
    CreateTokenApplicationProvider,
    GetAllTokensApplicationProvider,
    GetTokenByIdApplicationProvider,
  ],
})
export class TokenFeatureModule {}
