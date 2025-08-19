import Joi from 'joi';

export const createLogSchema = Joi.object({
  event: Joi.string().required(),
  value: Joi.number().required()
});
