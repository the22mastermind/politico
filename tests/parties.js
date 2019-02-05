import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);
chai.should();

// CREATE PARTY
describe('POST /api/v1/parties', () => {
  it('Should return status code 201', () => {
    chai.request(app)
      .post('/api/v1/parties')
      .send({
        name: 'Political Party 1',
        hqaddress: 'Kigali, Rwanda',
        logourl: 'https://www.google.com'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0].id).to.be.a('number');
        expect(res.body.data[0].name).to.be.a('string');
      });
  });
});

describe('POST /api/v1/parties', () => {
  it('Should return status code 400', () => {
    chai.request(app)
      .post('/api/v1/parties')
      .send({
      	name: '',
      	hqaddress: 'Kigali, Rwanda',
      	logourl: ' '
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
      });
  });
});

// VIEW ALL PARTIES
describe('GET /api/v1/parties', () => {
  it('Should return status code 200', () => {
    chai.request(app)
      .get('/api/v1/parties')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0].id).to.be.a('number');
        expect(res.body.data[0].name).to.be.a('string');
        expect(res.body.data[0].logourl).to.be.a('string');
      });
  });
});

// VIEW SINGLE PARTY
describe('GET /api/v1/parties/<party-id>', () => {
  it('Should return status code 200', () => {
    let partyId = 1;
    chai.request(app)
      .get(`/api/v1/parties/${partyId}`)
      .end((err, res) => {
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

describe('GET /api/v1/parties/<party-id>', () => {
  it('Should return status code 404', () => {
    let partyId = 100;
    chai.request(app)
      .get(`/api/v1/parties/${partyId}`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('status');
      });
  });
});
