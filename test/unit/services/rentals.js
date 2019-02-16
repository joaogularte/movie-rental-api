const RentalService = require('../../../src/services/RentalService');

describe('Services Rentals', () => {
  const defaultRental = [{
    id: '14dbd0cf-56fd-46f8-a5eb-971c844f0024',
    titleMovie: '',
    idUser: '',
    status: 'rented',
  }];
  const defaultMovie = [{
    id: '801ca591-2a7f-404d-ba7e-4ad57801f9c1',
    title: 'Default Movie',
    director: 'Director of Default Movie',
    quantities: 3,
  }];
  const defaultUser = [{
    id: '51f5fb36-db54-4e68-a0f1-634a7d82ac3c',
    name: 'defaultUser',
    email: 'defaultuser@email.com',
    password: '12345',
  }];

  beforeEach((done) => {
    knex.from('users')
      .insert(defaultUser[0])
      .then(() => {
        defaultRental[0].idUser = defaultUser[0].id;
        knex.from('movies')
          .insert(defaultMovie[0])
          .then(() => {
            defaultRental[0].titleMovie = defaultMovie[0].title;
            knex.from('rentals')
              .insert(defaultRental[0])
              .then(() => done());
          });
      });
  });

  afterEach((done) => {
    knex.from('rentals')
      .del()
      .then(() => {
        knex.from('users')
          .del()
          .then(() => {
            knex.from('movies')
              .del()
              .then(() => done());
          });
      });
  });

  describe('Get all rentals: list()', () => {
    it('should return a list of rentals', async () => {
      const rentals = await RentalService.list();
      expect(rentals[0]).to.have.property('id');
      expect(rentals[0]).to.have.property('titleMovie');
      expect(rentals[0]).to.have.property('name');
      expect(rentals[0]).to.have.property('email');
      expect(rentals[0]).to.have.property('status');
    });
  });
});
