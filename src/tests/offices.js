import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);
chai.should();

// CREATE OFFICE
describe('POST /api/v1/offices', () => {
  it('Should return status code 201', () => {
    chai.request(app)
      .post('/api/v1/offices')
      .send({
        type: 'federal',
        name: 'Senate',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0].id).to.be.a('number');
        expect(res.body.data[0].type).to.be.a('string');
        expect(res.body.data[0].name).to.be.a('string');
      });
    chai.request(app)
      .post('/api/v1/offices')
      .send({
        type: 'federal',
        name: 'Senate',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
      });
  });
});

describe('POST /api/v1/offices', () => {
  it('Should return status code 400', () => {
    chai.request(app)
      .post('/api/v1/offices')
      .send({
      	name: '',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
      });
  });
});

// ***********************************

// VIEW ALL OFFICES
describe('GET /api/v1/offices', () => {
  it('Should return status code 200', () => {
    chai.request(app)
      .get('/api/v1/offices')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('array');
      });
  });
});

// ***********************************

// VIEW SPECIFIC POLITICAL OFFICE
describe('GET /api/v1/offices/<office-id>', () => {
  it('Should return status code 200', () => {
    chai.request(app)
      .post('/api/v1/offices')
      .send({
        type: 'state',
        name: 'Senate',
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0].id).to.be.a('number');
        expect(res.body.data[0].type).to.be.a('string');
        expect(res.body.data[0].name).to.be.a('string');
      });
    let officeId = 1;
    chai.request(app)
      .get(`/api/v1/offices/${officeId}`)
      .end((err, res) => {
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
describe('GET /api/v1/offices/<office-id>', () => {
  it('Should return status code 404', () => {
    let officeId = 100;
    chai.request(app)
      .get(`/api/v1/offices/${officeId}`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('status');
      });
  });
});

// Invalid office id
describe('GET /api/v1/offices/<office-id>', () => {
  it('Should return status code 400', () => {
    let officeId = 'astring';
    chai.request(app)
      .get(`/api/v1/offices/${officeId}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status');
      });
  });
});

// ***********************************
