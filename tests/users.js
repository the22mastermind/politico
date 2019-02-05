import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);
chai.should();

// HOMEPAGE
describe('GET /', () => {
  it('Should return status code 200 and message', () => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Welcome to Politico!');
      });
  });
});

describe('POST /', () => {
  it('Should return status code 404', () => {
    chai.request(app)
      .post('/')
      .end((err, res) => {
        expect(res.status).to.equal(404);
      });
  });
});

// SIGN UP
describe('POST /api/v1/users/signup', () => {
  it('Should return status code 201', () => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
      	firstname: 'John',
      	lastname: 'Doe',
      	othername: 'aka',
      	email: 'johndoe@gmail.com',
      	password: 'johndoe@2019',
      	phonenumber: '+250787770000',
      	passporturl: 'https://www.google.com',
      	isadmin: true
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Success!');
        expect(res.body.data).to.be.a('array');
      });
  });
});

describe('POST /api/v1/users/signup', () => {
  it('Should return status code 400', () => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({
      	firstname: '',
      	lastname: '',
      	othername: 'aka',
      	email: 'johndoe@gmail.com',
      	password: 'johndoe@2019',
      	phonenumber: '',
      	passporturl: 'https://www.google.com',
      	isadmin: true
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
      });
  });
});


