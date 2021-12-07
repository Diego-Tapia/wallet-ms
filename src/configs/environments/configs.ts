import { registerAs } from '@nestjs/config';

export default registerAs('configs', () => ({
  app: {
    port: process.env.PORT,
  },
  database: {
    uri: process.env.URI,
  },
  sqs: {
    url_t: process.env.SQS_T_URL,
    accesKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  cognito: {
    user_pool: process.env.COGNITO_USER_POOL_ID,
    client_id: process.env.COGNITO_CLIENT_ID,
  },
  secret:{
    secret: process.env.JWT_SECRET,
  },
  blockchain_ms:{
    url: process.env.BLOCKCHAIN_URL,
  }
}));
