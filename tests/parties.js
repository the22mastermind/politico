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
