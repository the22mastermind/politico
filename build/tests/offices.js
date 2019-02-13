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

// CREATE OFFICE
describe('POST /api/v1/offices', function () {
  it('Should return status code 201', function () {
    _chai2.default.request(_index2.default).post('/api/v1/offices').send({
      type: 'federal',
      name: 'Senate'
    }).end(function (err, res) {
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.a('array');
      expect(res.body.data[0].id).to.be.a('number');
      expect(res.body.data[0].type).to.be.a('string');
      expect(res.body.data[0].name).to.be.a('string');
    });
    _chai2.default.request(_index2.default).post('/api/v1/offices').send({
      type: 'federal',
      name: 'Senate'
    }).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
    });
  });
});

describe('POST /api/v1/offices', function () {
  it('Should return status code 400', function () {
    _chai2.default.request(_index2.default).post('/api/v1/offices').send({
      name: ''
    }).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
    });
  });
});

// ***********************************

// VIEW ALL OFFICES
describe('GET /api/v1/offices', function () {
  it('Should return status code 200', function () {
    _chai2.default.request(_index2.default).get('/api/v1/offices').end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.a('array');
    });
  });
});

// ***********************************

// VIEW SPECIFIC POLITICAL OFFICE
describe('GET /api/v1/offices/<office-id>', function () {
  it('Should return status code 200', function () {
    _chai2.default.request(_index2.default).post('/api/v1/offices').send({
      type: 'state',
      name: 'Senate'
    }).end(function (err, res) {
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.a('array');
      expect(res.body.data[0].id).to.be.a('number');
      expect(res.body.data[0].type).to.be.a('string');
      expect(res.body.data[0].name).to.be.a('string');
    });
    var officeId = 1;
    _chai2.default.request(_index2.default).get('/api/v1/offices/' + officeId).end(function (err, res) {
      console.log(res.body);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.a('object');
      expect(res.body.data.id).to.be.a('number');
      expect(res.body.data.type).to.be.a('string');
      expect(res.body.data.name).to.be.a('string');
    });
  });
});

// Unexisting office id
describe('GET /api/v1/offices/<office-id>', function () {
  it('Should return status code 404', function () {
    var officeId = 100;
    _chai2.default.request(_index2.default).get('/api/v1/offices/' + officeId).end(function (err, res) {
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('status');
    });
  });
});

// Invalid office id
describe('GET /api/v1/offices/<office-id>', function () {
  it('Should return status code 400', function () {
    var officeId = 'astring';
    _chai2.default.request(_index2.default).get('/api/v1/offices/' + officeId).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('status');
    });
  });
});

// ***********************************
//# sourceMappingURL=offices.js.map