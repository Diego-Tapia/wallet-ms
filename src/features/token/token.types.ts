export const TokenTypes = {
  APPLICATION: {
    CREATE_TOKEN: Symbol('CreateTokenApplication'),
    GET_ALL_TOKENS: Symbol('GetAllTokensApplication'),
    GET_TOKEN_BY_ID: Symbol('GetTokenByIdApplication'),
  },
  INFRASTRUCTURE: {
    REPOSITORY: Symbol('TokenRepository'),
  },
};
