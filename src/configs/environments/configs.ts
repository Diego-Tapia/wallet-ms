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
}));
