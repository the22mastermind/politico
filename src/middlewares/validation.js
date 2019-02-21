import Joi from 'joi';

function validateSignUp(user) {
  const schema = {
    firstname: Joi.string().regex(/^[a-zA-Z0-9]+$/).min(3).max(30).required(),
    lastname: Joi.string().regex(/^[a-zA-Z0-9]+$/).min(3).max(30).required(),
    othername: Joi.string().max(30).optional(),
    email: Joi.string().email().required(),
    phonenumber: Joi.string().regex(/^[+][0-9]+$/).min(10).max(15).required(),
    passporturl: Joi.string().regex(/^[a-zA-Z] |[a-zA-Z0-9]+$/).min(3).max(100).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9] |[a-zA-Z0-9]+$/).min(8).max(15).required(),
    role: Joi.string().max(9).optional(),
  };
  return Joi.validate(user, schema);
};

function validateCreateParty(party) {
  const schema = {
    name: Joi.string().regex(/^[a-zA-Z0-9 ]+$|^[a-zA-Z0-9 ]+$^[a-zA-Z0-9]+$/).min(3).max(30).trim().required(),
    hqaddress: Joi.string().min(3).max(100).required(),
    logourl: Joi.string().max(200).required()
  };
  const options = {
    language: {
      key: '{{key}} '
    }
  };
  return Joi.validate(party, schema, options);
};

function validateEditParty(party) {
  const schema = {
    name: Joi.string().trim().regex(/^[a-zA-Z0-9 ]+$|^[a-zA-Z0-9 ]+$^[a-zA-Z0-9]+$/).min(3).max(30).required()
  };
  return Joi.validate(party, schema);
};

function validateCreateOffice(office) {
  const schema = {
    type: Joi.string().valid(['federal','legislative','state','local government']).min(3).max(30).trim().required(),
    name: Joi.string().trim().regex(/^[a-zA-Z]|^[a-zA-Z ]+$^[a-zA-Z ]/).min(3).max(30).required()
  };
  return Joi.validate(office, schema);
};

function validateLogin(user) {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9] |[a-zA-Z0-9]+$/).min(8).max(15).required()
  };
  return Joi.validate(user, schema);
};

function validateCandidate(candidate) {
  const schema = {
    party: Joi.number().integer().min(1).required(),
    user: Joi.number().integer().min(1).required()
  };
  return Joi.validate(candidate, schema);
};

function validateVote(vote) {
  const schema = {
    office: Joi.number().integer().min(1).required(),
    candidate: Joi.number().integer().min(1).required()
  };
  return Joi.validate(vote, schema);
};

export default {
  validateSignUp,
  validateCreateParty,
  validateEditParty,
  validateCreateOffice,
  validateLogin,
  validateCandidate,
  validateVote
};
