const MovieService = require('../../../src/services/MovieService');

describe('Services Movies', () => {
  const defaultMovie = [{
    id: 'd1b039e8-997b-4bdf-8a20-1fae7c1c7c0d',
    title: 'Default Movie',
    director: 'Director of Default Movie',
    quantities: 1,
  }];

  const updatedMovie = {
    title: 'Updated Movie',
    director: 'Director Updated',
    quantities: 2,
  };

  const newMovie = [{
    title: 'New Movie',
    director: 'Director of New Movie',
    quantities: 1,
  }];

  beforeEach((done) => {
    knex.from('movies')
      .insert(defaultMovie[0])
      .then(() => done());
  });

  afterEach((done) => {
    knex.from('movies')
      .del()
      .then(() => done());
  });

  describe('Get all movies: list()', () => {
    it('should return a list of movies', async () => {
      const movies = await MovieService.list();
      expect(movies).to.be.eql(defaultMovie);
    });
  });

  describe('Get a movie: get()', () => {
    it('should return a movie', async () => {
      const movie = await MovieService.get(defaultMovie[0].id);
      expect(movie).to.be.eql(defaultMovie[0]);
    });
  });

  describe('Create a movie: post()', () => {
    it('should return a movie id', async () => {
      const movieId = await MovieService.post(newMovie[0]);
      expect(movieId.id).to.be.a.uuid('v4');
    });
  });

  describe('Update a movie: put()', () => {
    it('should return true', async () => {
      const updated = await MovieService.put(defaultMovie[0].id, updatedMovie);
      expect(updated).to.have.eql(true);
    });
  });

  describe('Delete a movie: delete()', () => {
    it('should return true', async () => {
      const deleted = await MovieService.delete(defaultMovie[0].id);
      expect(deleted).to.have.eql(true);
    });
  });
});
