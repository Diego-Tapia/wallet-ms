import * as Joi from 'joi';

export default Joi.object({
  PORT: Joi.number().required(),
  SQS_T_URL: Joi.string().required(),
  COGNITO_USER_POOL_ID: Joi.string().required(),
  COGNITO_CLIENT_ID: Joi.string().required(),
  BLOCKCHAIN_URL: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY:Joi.string().required(),
  AWS_ACCESS_KEY_ID:Joi.string().required(),

});
