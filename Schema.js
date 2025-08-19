
import Joi from "joi";

//register schema
export const userValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
  .pattern(new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"))
  .message("Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.")
  .required(),
  role:Joi.string().required()
});


// Login schema
export const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
