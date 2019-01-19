const UserService = require('../../../src/services/UserService');

describe('Services Users', () => {
  const defaultUser = [{
    id: '27ff9681-ca75-43ca-91b1-a10447943395',
    name: 'Default User',
    email: 'defaultuser@email.com',
    password: 'senhaDefaultUser',
  }];

  const newUser = [{
    name: 'New User',
    email: 'newuser@email.com',
    password: 'supersenha'
  }]

  beforeEach((done) => {
    knex.from('users')
      .insert(defaultUser[0])
      .then(() => done());
  });

  afterEach((done) => {
    knex.from('users')
      .del()
      .then(() => done());
  });

  describe('Get all users: list()', () => {
    it('should return a list of users', async () => {
      const users = await UserService.list();
      expect(users).to.be.eql(defaultUser);
    });
  });

  describe('Get an user: get()', () => {
    it('should return an user', async () => {
      const user = await UserService.get(defaultUser[0].id);
      expect(user).to.be.eql(defaultUser[0]);
    });
  });

  describe('Create an user: post()', () => {
    it('should return an user id', async () => {
      const userId = await UserService.post(newUser[0]);
      expect(userId.id).to.be.a.uuid('v4');
    })
  })
});
