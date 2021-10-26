import { registerAs } from '@nestjs/config';

export default registerAs('configs', () => ({
  app: {
    port: process.env.PORT,
  },
  database: {
    engine: process.env.DB_ENGINE,
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  },
  sqs: {
    host: process.env.SQS_HOST,
    user: process.env.SQS_USER,
    pass: process.env.SQS_PASS,
  },
  cognito: {
    user_pool: process.env.COGNITO_USER_POOL_ID,
    client_id: process.env.COGNITO_CLIENT_ID,
    cognito_region: process.env.COGNITO_REGION,
    authority: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
  },
  secret:{
    secret: process.env.SECRET,
  },
  blockchain_ms:{
    url: process.env.BLOCKCHAIN_URL,
  }
}));
