import Joi from 'joi';

function validateSignUp(user) {
  const schema = {
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
    othername: Joi.string().max(30).optional(),
    email: Joi.string().email().required(),
    phonenumber: Joi.string().min(10).max(15).required(),
    passporturl: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(8).max(15).required(),
    isadmin: Joi.boolean().optional(),
  };
  return Joi.validate(user, schema);
};

export default {
  validateSignUp
};
