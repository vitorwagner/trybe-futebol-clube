import * as Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().required().email().label('email'),
  password: Joi.string().required().min(6).label('password'),
});

export default loginSchema;
