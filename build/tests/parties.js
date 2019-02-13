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

// CREATE PARTY
describe('POST /api/v1/parties', function () {
  it('Should return status code 201', function () {
    _chai2.default.request(_index2.default).post('/api/v1/parties').send({
      name: 'Political Party 1',
      hqaddress: 'Kigali, Rwanda',
      logourl: 'https://www.google.com'
    }).end(function (err, res) {
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.a('array');
      expect(res.body.data[0].id).to.be.a('number');
      expect(res.body.data[0].name).to.be.a('string');
    });
  });
});

// Party already exists
describe('POST /api/v1/parties', function () {
  it('Should return status code 400', function () {
    _chai2.default.request(_index2.default).post('/api/v1/parties').send({
      name: 'Political Party 10',
      hqaddress: 'Kigali, Rwanda',
      logourl: 'https://www.google.com'
    }).end(function (err, res) {
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.a('array');
      expect(res.body.data[0].id).to.be.a('number');
      expect(res.body.data[0].name).to.be.a('string');
    });
    // Send same data (checks party name)
    _chai2.default.request(_index2.default).post('/api/v1/parties').send({
      name: 'Political Party 10',
      hqaddress: 'Kigali, Rwanda',
      logourl: 'https://www.google.com'
    }).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('status');
    });
  });
});

// Invalid data
describe('POST /api/v1/parties', function () {
  it('Should return status code 400', function () {
    _chai2.default.request(_index2.default).post('/api/v1/parties').send({
      name: '   ',
      hqaddress: 'Kigali, Rwanda',
      logourl: '   '
    }).end(function (err, res) {
      console.log(res.body);
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
    });
  });
});
// **********************************************
// VIEW ALL PARTIES
describe('GET /api/v1/parties', function () {
  it('Should return status code 200', function () {
    _chai2.default.request(_index2.default).get('/api/v1/parties').end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.a('array');
    });
  });
});
// **********************************************
// VIEW SINGLE PARTY
describe('GET /api/v1/parties/<party-id>', function () {
  it('Should return status code 200', function () {
    _chai2.default.request(_index2.default).post('/api/v1/parties').send({
      name: 'Political Party 1',
      hqaddress: 'Kigali, Rwanda',
      logourl: 'https://www.google.com'
    }).end(function (err, res) {
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.a('array');
      expect(res.body.data[0].id).to.be.a('number');
      expect(res.body.data[0].name).to.be.a('string');
    });
    var partyId = 1;
    _chai2.default.request(_index2.default).get('/api/v1/parties/' + partyId).end(function (err, res) {
      console.log(res.body);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.a('object');
      expect(res.body.data.id).to.be.a('number');
      expect(res.body.data.name).to.be.a('string');
      expect(res.body.data.logourl).to.be.a('string');
    });
  });
});

describe('GET /api/v1/parties/<party-id>', function () {
  it('Should return status code 404', function () {
    var partyId = 100;
    _chai2.default.request(_index2.default).get('/api/v1/parties/' + partyId).end(function (err, res) {
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('status');
    });
  });
});

describe('GET /api/v1/parties/<party-id>', function () {
  it('Should return status code 404', function () {
    var partyId = 'somestring';
    _chai2.default.request(_index2.default).get('/api/v1/parties/' + partyId).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('status');
    });
  });
});
// ***********************************************
// EDIT PARTY NAME
describe('PATCH /api/v1/parties/<party-id>', function () {
  it('Should return status code 200', function () {
    var partyId = 1;
    var newPartyName = { name: 'Updated Party 1' };
    _chai2.default.request(_index2.default).patch('/api/v1/parties/' + partyId).send(newPartyName).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.be.a('array');
      expect(res.body.data[0].id).to.be.a('number');
      expect(res.body.data[0].name).to.be.a('string');
      expect(res.body.data[0].name).to.equal('Updated Party 1');
    });
  });
});

// Unexisting party id
describe('PATCH /api/v1/parties/<party-id>', function () {
  it('Should return status code 404', function () {
    var partyId = 100;
    var newPartyName = { name: 'Updated Party 1' };
    _chai2.default.request(_index2.default).patch('/api/v1/parties/' + partyId).send(newPartyName).end(function (err, res) {
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('status');
    });
  });
});

// Invalid party id
describe('PATCH /api/v1/parties/<party-id>', function () {
  it('Should return status code 400', function () {
    var partyId = 'invalid id';
    var newPartyName = { name: 'Updated Party 1' };
    _chai2.default.request(_index2.default).patch('/api/v1/parties/' + partyId).send(newPartyName).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('status');
    });
  });
});

// Invalid edit form (empty party name)
describe('PATCH /api/v1/parties/<party-id>', function () {
  it('Should return status code 400', function () {
    var partyId = 1;
    var newPartyName = { name: '' };
    _chai2.default.request(_index2.default).patch('/api/v1/parties/' + partyId).send(newPartyName).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('status');
    });
  });
});

// Check if id is number
describe('PATCH /api/v1/parties/<party-id>', function () {
  it('Should return status code 404', function () {
    var partyId = 100;
    var newPartyName = { name: 'New Party Name' };
    _chai2.default.request(_index2.default).patch('/api/v1/parties/' + partyId).send(newPartyName).end(function (err, res) {
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('status');
    });
  });
});
// ************************************************

// DELETE PARTY
describe('DELETE /api/v1/parties/<party-id>', function () {
  it('Should return status code 200', function () {
    var partyId = 1;
    _chai2.default.request(_index2.default).delete('/api/v1/parties/' + partyId).end(function (err, res) {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.data[0].message).to.equal('Party deleted successfully!');
    });
  });
});
// Unexisting party
describe('DELETE /api/v1/parties/<party-id>', function () {
  it('Should return status code 404', function () {
    var partyId = 100;
    _chai2.default.request(_index2.default).delete('/api/v1/parties/' + partyId).end(function (err, res) {
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.equal('The party of id: ' + partyId + ' does not exist.');
    });
  });
});

// Invalid party id
describe('DELETE /api/v1/parties/<party-id>', function () {
  it('Should return status code 400', function () {
    var partyId = 'invalid id';
    _chai2.default.request(_index2.default).delete('/api/v1/parties/' + partyId).end(function (err, res) {
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('status');
    });
  });
});
//# sourceMappingURL=parties.js.map