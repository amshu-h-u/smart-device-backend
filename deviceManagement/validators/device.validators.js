import Joi from 'joi';

export const createDeviceSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  type: Joi.string().min(2).max(100).required(),
  status: Joi.string().valid('active', 'inactive').optional()
});

export const updateDeviceSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  type: Joi.string().min(2).max(100).optional(),
  status: Joi.string().valid('active', 'inactive').optional()
}).min(1); // At least one field required

export const heartbeatSchema = Joi.object({
  status: Joi.string().valid('active', 'inactive').required()
});
