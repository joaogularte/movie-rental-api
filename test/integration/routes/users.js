const jwt = require('jwt-simple');

const secret = require('../../../src/config/secret');
const UserService = require('../../../src/services/UserService');

describe('Routes Users', () => {
  const defaultUser = {
    name: 'DefaultUser',
    email: 'defaultuser@email.com',
    password: 'supersenha',
  };
  let token;
  beforeEach((done) => {
    UserService.post(defaultUser)
      .then((userId) => {
        defaultUser.id = userId.id;
        token = jwt.encode(userId, secret.jwtSecret);
        done();
      });
  });

  afterEach((done) => {
    knex.from('users').del()
      .then(() => {
        done();
      });
  });

  describe('Route GET /api/users', () => {
    it('should return a list of users', (done) => {
      request
        .get('/api/users')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.data[0].id).to.have.lengthOf(36);
          expect(res.body.data[0].name).to.be.eql(defaultUser.name);
          expect(res.body.data[0].email).to.be.eql(defaultUser.email);

          done(err);
        });
    });
  });

  describe('Route GET /api/users/{id}', () => {
    it('should return a user', (done) => {
      request
        .get(`/api/users/${defaultUser.id}`)
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.data.id).to.be.eql(defaultUser.id);
          expect(res.body.data.name).to.be.eql(defaultUser.name);
          expect(res.body.data.email).to.be.eql(defaultUser.email);

          done(err);
        });
    });
  });

  describe('Route POST /api/users', () => {
    it('should create a user', (done) => {
      const newUser = {
        name: 'New User',
        email: 'newuser@email.com',
        password: 'supersenha',
      };

      request
        .post('/api/users')
        .set('Authorization', `JWT ${token}`)
        .send(newUser)
        .end((err, res) => {
          expect(res.body.data.id).to.have.lengthOf(36);

          done(err);
        });
    });
  });

  describe('Route PUT /api/users/{id}', () => {
    it('should edit a user', (done) => {
      const updatedUser = {
        name: 'Updated User',
        email: 'updated@email.com',
        password: 'senha',
      };

      request
        .put(`/api/users/${defaultUser.id}`)
        .set('Authorization', `JWT ${token}`)
        .send(updatedUser)
        .end((err, res) => {
          expect(res.body.success).to.be.eql(true);
          done(err);
        });
    });
  });

  describe('Route DELETE /api/users/{id}', () => {
    it('should delete a user', (done) => {
      request
        .delete(`/api/users/${defaultUser.id}`)
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.success).to.be.eql(true);
          done(err);
        });
    });
  });
});
