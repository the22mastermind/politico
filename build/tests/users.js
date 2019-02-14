'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

_chai2.default.use(_chaiHttp2.default);
_chai2.default.should();

// HOMEPAGE
describe('GET /', function () {
  it('Should return status code 200 and message', function () {
    _chai2.default.request(_index2.default).get('/').end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Welcome to Politico!');
    });
  });
});

describe('POST /', function () {
  it('Should return status code 404', function () {
    _chai2.default.request(_index2.default).post('/').end(function (err, res) {
      expect(res.status).to.equal(404);
    });
  });
});

// SIGN UP
describe('POST /api/v1/users/signup', function () {
  it('Should return status code 201', function () {
    _chai2.default.request(_index2.default).post('/api/v1/users/signup').send({
      firstname: 'John',
      lastname: 'Doe',
      othername: 'aka',
      email: 'johndoe@gmail.com',
      password: 'johndoe@2019',
      phonenumber: '+250787770000',
      passporturl: 'https://www.google.com',
      isadmin: true
    }).end(function (err, res) {
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Success!');
      expect(res.body.data).to.be.a('array');
    });
  });
});

// Invalid signup form
describe('POST /api/v1/users/signup', function () {
  it('Should return status code 400', function () {
    _chai2.default.request(_index2.default).post('/api/v1/users/signup').send({
      firstname: '',
      lastname: '',
      othername: '',
      email: 'johndoe@gmail.com',
      password: 'johndoe@2019',
      phonenumber: '',
      passporturl: 'https://www.google.com',
      isadmin: true
    }).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
    });
  });
});
// Register an already registered user
describe('POST /api/v1/users/signup', function () {
  it('Should return status code 400', function () {
    // Register user
    _chai2.default.request(_index2.default).post('/api/v1/users/signup').send({
      firstname: 'John',
      lastname: 'Doe',
      othername: 'aka',
      email: 'johndoe1@gmail.com',
      password: 'johndoe@2019',
      phonenumber: '+250787770000',
      passporturl: 'https://www.google.com',
      isadmin: true
    }).end(function (err, res) {
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.equal('Success!');
      expect(res.body.data).to.be.a('array');
    });
    // Try registering same email again
    _chai2.default.request(_index2.default).post('/api/v1/users/signup').send({
      firstname: 'John',
      lastname: 'Doe',
      othername: 'aka',
      email: 'johndoe1@gmail.com',
      password: 'johndoe@2019',
      phonenumber: '+250787770000',
      passporturl: 'https://www.google.com',
      isadmin: true
    }).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('status');
    });
  });
});
//# sourceMappingURL=users.js.map