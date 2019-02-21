import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import pool from '../database/connector';

const { expect } = chai;
chai.use(chaiHttp);
chai.should();

let userToken = '';
let adminToken = '';
// Login credentials | Generate token
before((done) => {
  const user = {
    email: 'johndoe123456@gmail.com',
    password: 'hello123',
  };
  chai.request(app)
    .post('/api/v1/users/auth/login')
    .send(user)
    .end((err, res) => {
      // console.log('((((((++++)))))) ', res.body);
      userToken = res.body.data[0].token;
      // console.log('USER TOKEN: ', userToken);
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('status');
    });
  const admin = {
    email: 'johndoe1234567@gmail.com',
    password: 'hello123',
  };
  chai.request(app)
    .post('/api/v1/users/auth/login')
    .send(admin)
    .end((err, res) => {
      // console.log('((((((----)))))) ', res.body);
      adminToken = res.body.data[0].token;
      // console.log('ADMIN TOKEN: ', adminToken);
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('status');
      done();
    });
  // Open connection
  // pool.on('connect', () => {
  //   console.log('Connected to PSQL db');
  // });
  // Drop office table
  const deleteOfficeQuery = 'DROP TABLE IF EXISTS offices CASCADE;';
  const createOfficeQuery = 
    `CREATE TABLE IF NOT EXISTS offices (
      id serial PRIMARY KEY,
      type varchar (150) NOT NULL,
      name varchar (30) NOT NULL
    );`;
  const con = `${deleteOfficeQuery};${createOfficeQuery};`;
  pool.query(con)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });  
});

// CREATE OFFICE
describe('POST /api/v1/offices', () => {
  it('Should return status code 201', () => {
    // console.log('>>>> ', adminToken);
    chai.request(app)
      .post('/api/v1/offices')
      .set("Authorization", 'Bearer ' + adminToken)
      .send({
        type: 'federal',
        name: 'Senate',
      })
      .end((err, res) => {
        console.log('POST OFFICE: ', res.body);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0].type).to.be.a('string');
        expect(res.body.data[0].name).to.be.a('string');
      });
  });
});

// Duplicate office
describe('POST /api/v1/offices **', () => {
  it('Should return status code 409', () => {
    chai.request(app)
      .post('/api/v1/offices')
      .set("Authorization", 'Bearer ' + adminToken)
      .send({
        type: 'federal',
        name: 'Senate',
      })
      .end((err, res) => {
        console.log('000000000 ', res.body);
        expect(res.status).to.equal(409);
        // expect(res.status).to.equal(201);
        // expect(res.body).to.have.property('error');
      });
  });
});

describe('POST /api/v1/offices', () => {
  it('Should return status code 400', () => {
    chai.request(app)
      .post('/api/v1/offices')
      .set("Authorization", 'Bearer ' + adminToken)
      .send({
      	name: '',
      })
      .end((err, res) => {
        // console.log('---- ', res.body);
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
    let officeId = 1;
    chai.request(app)
      .get(`/api/v1/offices/${officeId}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data[0].id).to.be.a('number');
        expect(res.body.data[0].type).to.be.a('string');
        expect(res.body.data[0].name).to.be.a('string');
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
