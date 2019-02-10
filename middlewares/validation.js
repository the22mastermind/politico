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

function validateCreateParty(party) {
  const schema = {
    name: Joi.string().min(3).max(30).required(),
    hqaddress: Joi.string().min(3).max(100).required(),
    logourl: Joi.string().max(200).required()
  };
  return Joi.validate(party, schema);
};

function validateEditParty(party) {
  const schema = {
    name: Joi.string().min(3).max(30).required()
  };
  return Joi.validate(party, schema);
};

function validateCreateOffice(office) {
  const schema = {
    type: Joi.string().min(3).max(30).required(),
    name: Joi.string().min(3).max(30).required()
  };
  return Joi.validate(office, schema);
};

export default {
  validateSignUp,
  validateCreateParty,
  validateEditParty,
  validateCreateOffice
};
