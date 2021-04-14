import Joi from "@hapi/joi"

const registerValidation = (data: any) => {

  const validateSchema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });

  return validateSchema.validate(data);
}
const loginValidation = (data: any) => {

  const validateSchema = Joi.object().keys({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });

  return validateSchema.validate(data);
}

export {
  registerValidation,
  loginValidation
}