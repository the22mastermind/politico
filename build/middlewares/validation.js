'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateSignUp(user) {
  var schema = {
    firstname: _joi2.default.string().min(3).max(30).required(),
    lastname: _joi2.default.string().min(3).max(30).required(),
    othername: _joi2.default.string().max(30).optional(),
    email: _joi2.default.string().email().required(),
    phonenumber: _joi2.default.string().min(10).max(15).required(),
    passporturl: _joi2.default.string().min(3).max(100).required(),
    password: _joi2.default.string().min(8).max(15).required(),
    isadmin: _joi2.default.boolean().optional()
  };
  return _joi2.default.validate(user, schema);
};

function validateCreateParty(party) {
  var schema = {
    name: _joi2.default.string().min(3).max(30).required(),
    hqaddress: _joi2.default.string().min(3).max(100).required(),
    logourl: _joi2.default.string().max(200).required()
  };
  return _joi2.default.validate(party, schema);
};

function validateEditParty(party) {
  var schema = {
    name: _joi2.default.string().min(3).max(30).required()
  };
  return _joi2.default.validate(party, schema);
};

function validateCreateOffice(office) {
  var schema = {
    type: _joi2.default.string().min(3).max(30).required(),
    name: _joi2.default.string().min(3).max(30).required()
  };
  return _joi2.default.validate(office, schema);
};

exports.default = {
  validateSignUp: validateSignUp,
  validateCreateParty: validateCreateParty,
  validateEditParty: validateEditParty,
  validateCreateOffice: validateCreateOffice
};
//# sourceMappingURL=validation.js.map