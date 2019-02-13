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

// Party already exists
describe('POST /api/v1/parties', () => {
  it('Should return status code 400', () => {
    chai.request(app)
      .post('/api/v1/parties')
      .send({
        name: 'Political Party 10',
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
    // Send same data (checks party name)
    chai.request(app)
      .post('/api/v1/parties')
      .send({
        name: 'Political Party 10',
        hqaddress: 'Kigali, Rwanda',
        logourl: 'https://www.google.com'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status');
      });
  });
});

// Invalid data
describe('POST /api/v1/parties', () => {
  it('Should return status code 400', () => {
    chai.request(app)
      .post('/api/v1/parties')
      .send({
      	name: '   ',
      	hqaddress: 'Kigali, Rwanda',
      	logourl: '   '
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
      });
  });
});
// **********************************************
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
      });
  });
});
// **********************************************
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

describe('GET /api/v1/parties/<party-id>', () => {
  it('Should return status code 404', () => {
    let partyId = 'somestring';
    chai.request(app)
      .get(`/api/v1/parties/${partyId}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status');
      });
  });
});
// ***********************************************
// EDIT PARTY NAME
describe('PATCH /api/v1/parties/<party-id>', () => {
  it('Should return status code 200', () => {
    let partyId = 1;
    let newPartyName = { name: 'Updated Party 1' };
    chai.request(app)
      .patch(`/api/v1/parties/${partyId}`)
      .send(newPartyName)
      .end((err, res) => {
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
describe('PATCH /api/v1/parties/<party-id>', () => {
  it('Should return status code 404', () => {
    let partyId = 100;
    let newPartyName = { name: 'Updated Party 1' };
    chai.request(app)
      .patch(`/api/v1/parties/${partyId}`)
      .send(newPartyName)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('status');
      });
  });
});

// Invalid party id
describe('PATCH /api/v1/parties/<party-id>', () => {
  it('Should return status code 400', () => {
    let partyId = 'invalid id';
    let newPartyName = { name: 'Updated Party 1' };
    chai.request(app)
      .patch(`/api/v1/parties/${partyId}`)
      .send(newPartyName)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status');
      });
  });
});

// Invalid edit form (empty party name)
describe('PATCH /api/v1/parties/<party-id>', () => {
  it('Should return status code 400', () => {
    let partyId = 1;
    let newPartyName = { name: '' };
    chai.request(app)
      .patch(`/api/v1/parties/${partyId}`)
      .send(newPartyName)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status');
      });
  });
});

// Check if id is number
describe('PATCH /api/v1/parties/<party-id>', () => {
  it('Should return status code 404', () => {
    let partyId = 100;
    let newPartyName = { name: 'New Party Name' };
    chai.request(app)
      .patch(`/api/v1/parties/${partyId}`)
      .send(newPartyName)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('status');
      });
  });
});
// ************************************************

// DELETE PARTY
describe('DELETE /api/v1/parties/<party-id>', () => {
  it('Should return status code 200', () => {
    let partyId = 1;
    chai.request(app)
      .delete(`/api/v1/parties/${partyId}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.data[0].message).to.equal('Party deleted successfully!');
      });
  });
});
 // Unexisting party
describe('DELETE /api/v1/parties/<party-id>', () => {
  it('Should return status code 404', () => {
    let partyId = 100;
    chai.request(app)
      .delete(`/api/v1/parties/${partyId}`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal(`The party of id: ${partyId} does not exist.`);
      });
  });
});

// Invalid party id
describe('DELETE /api/v1/parties/<party-id>', () => {
  it('Should return status code 400', () => {
    let partyId = 'invalid id';
    chai.request(app)
      .delete(`/api/v1/parties/${partyId}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status');
      });
  });
});
