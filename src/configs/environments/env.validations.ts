import * as Joi from 'joi';

export default Joi.object({
  PORT: Joi.number().required(),
  DB_ENGINE: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  SQS_HOST: Joi.string().required(),
  SQS_USER: Joi.string().required(),
  SQS_PASS: Joi.string().required(),
});
