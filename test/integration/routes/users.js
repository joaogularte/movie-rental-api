const knex = require('../../../src/config/db');
const UserService = require('../../../src/services/UserService');

describe('Routes Users', () => {
    const defaultUser = {
        name: 'DefaultUser',
        email: 'defaultuser@email.com',
        password: 'supersenha',
        role: 'admin'
    }

    beforeEach(done => {
        knex.from('users').del().then(() => {
            UserService.post(defaultUser)
                .then(() => done());
        })
    });

    describe('Route GET /api/users', () => {
        it('should return a list of users', done => {
            request
                .get('/api/users')
                .end((err, res) => {
                    
                    expect(res.body.data[0].name).to.be.eql(defaultUser.name);
                    expect(res.body.data[0].email).to.be.eql(defaultUser.email);
                    expect(res.body.data[0].role).to.be.eql(defaultUser.role);
                    done(err);
                })
        })
    });

    describe('Route GET /api/users/{id}', () => {
        it('should return a movie', done => {
            request
                .get('/api/users/d1b039e8-997b-4bdf-8a20-1fae7c1c7c0d')
                .end((err, res) => {

                    expect(res.body.data.id).to.be.eql(defaultMovie.id);
                    expect(res.body.data.title).to.be.eql(defaultMovie.title);
                    expect(res.body.data.director).to.be.eql(defaultMovie.director);
                    expect(res.body.data.quantities).to.be.eql(defaultMovie.quantities);

                    done(err);
                })
        })
    });
});