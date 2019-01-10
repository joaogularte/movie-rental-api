const jwt = require('jwt-simple');

const knex = require('../../../src/config/db');
const secret = require('../../../src/config/secret');
const UserService = require('../../../src/services/UserService');

/* Descrição geral do teste */
describe('Routes Movies', () => {
  const defaultMovie = {
    id: 'd1b039e8-997b-4bdf-8a20-1fae7c1c7c0d',
    title: 'Default Movie',
    director: 'Director of Default Movie',
    quantities: 1,
  };

  const defaultJohn = {
    name: 'john doe',
    email: 'john@email.com',
    password: '12345',
  };

  let token;

  beforeEach((done) => {
    knex.from('movies').insert(defaultMovie)
      .then(() => {
        UserService.post(defaultJohn)
          .then((user) => {
            token = jwt.encode(user, secret.jwtSecret);
            done();
          });
      });
  });

  afterEach((done) => {
    knex.from('movies').del()
      .then(() => {
        knex.from('users').del()
          .then(() => done());
      });
  });

  describe('Route GET /api/movies', () => {
    it('should return a list of movies', (done) => {
      request
        .get('/api/movies')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.data[0].id).to.be.eql(defaultMovie.id);
          expect(res.body.data[0].title).to.be.eql(defaultMovie.title);
          expect(res.body.data[0].director).to.be.eql(defaultMovie.director);
          expect(res.body.data[0].quantities).to.be.eql(defaultMovie.quantities);

          done(err);
        });
    });
  });

  describe('Route GET /api/movies/{id}', () => {
    it('should return a movie', (done) => {
      request
        .get('/api/movies/d1b039e8-997b-4bdf-8a20-1fae7c1c7c0d')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.data.id).to.be.eql(defaultMovie.id);
          expect(res.body.data.title).to.be.eql(defaultMovie.title);
          expect(res.body.data.director).to.be.eql(defaultMovie.director);
          expect(res.body.data.quantities).to.be.eql(defaultMovie.quantities);

          done(err);
        });
    });
  });

  describe('Route POST /api/movies', () => {
    it('should create a movie', (done) => {
      const newMovie = {
        title: 'New Movie',
        director: 'Director of New Movie',
        quantities: 1,
      };

      request
        .post('/api/movies')
        .set('Authorization', `JWT ${token}`)
        .send(newMovie)
        .end((err, res) => {
          expect(res.body.data.id).to.have.lengthOf(36);
          done(err);
        });
    });
  });

  describe('Route PUT /api/movies/{id}', () => {
    it('should edit a movie', (done) => {
      const updatedMovie = {
        director: 'Director of Updated Movie',
        quantities: 2,
      };

      request
        .put('/api/movies/d1b039e8-997b-4bdf-8a20-1fae7c1c7c0d')
        .set('Authorization', `JWT ${token}`)
        .send(updatedMovie)
        .end((err, res) => {
          expect(res.body.success).to.be.eql(true);
          done(err);
        });
    });
  });

  describe('Route DELETE /api/movies/{id}', () => {
    it('should delete a movie', (done) => {
      request
        .delete('/api/movies/d1b039e8-997b-4bdf-8a20-1fae7c1c7c0d')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.body.success).to.be.eql(true);
          done(err);
        });
    });
  });
});
