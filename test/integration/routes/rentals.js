const knex = require('../../../src/config/db');
const RentalModel = require('../../../src/models/RentalModel');
const MovieService = require('../../../src/services/MovieService');
const UserService = require('../../../src/services/UserService');

describe('Routes Rentals', () => {
    const defaultRental = {
        id: '14dbd0cf-56fd-46f8-a5eb-971c844f0024',
        titleMovie: '',
        idUser: '',
        status: 'rented'
    };
    const defaultMovie = {
        title: 'Default Movie',
        director: 'Director of Default Movie',
        quantities: 3
    };
    const defaultUser = {
        name: 'DefaultUser',
        email: 'defaultuser@email.com',
        password: 'supersenha',
        role: 'user'
    };
    
    beforeEach(done => {
        UserService.post(defaultUser)
        .then(user => {
            defaultRental.idUser = user.id
            MovieService.post(defaultMovie)
            .then(() => {
                defaultRental.titleMovie = defaultMovie.title;        
                knex.from('rentals').insert(defaultRental)
                .then(() => done());
            })
        });        
        
    });
    
    afterEach(done => {
        knex.from('rentals').del()
        .then(() => {
            knex.from('users').del()
            .then(() => {
                knex.from('movies').del()
                .then(() => {
                    done();
                })
            })
        })
    })

    describe('Route GET /api/rentals', () => {
        it('should return a list of rentals', done => {
            request
                .get('/api/rentals')
                .end((err, res) => {
                    expect(res.body.data[0].id).to.be.eql(defaultRental.id);
                    expect(res.body.data[0].titleMovie).to.be.eql(defaultRental.titleMovie);
                    expect(res.body.data[0].name).to.be.eql(defaultUser.name);
                    expect(res.body.data[0].email).to.be.eql(defaultUser.email);
                    expect(res.body.data[0].status).to.be.eql(defaultRental.status);
                    done(err);
                })
        })
    });

    describe('Route GET /api/rentals/{id}', () => {
        it('should return a rental', done => {
            request
                .get('/api/rentals/14dbd0cf-56fd-46f8-a5eb-971c844f0024')
                .end((err, res) => {
                    expect(res.body.data.id).to.be.eql(defaultRental.id);
                    expect(res.body.data.titleMovie).to.be.eql(defaultRental.titleMovie);
                    expect(res.body.data.name).to.be.eql(defaultUser.name);
                    expect(res.body.data.email).to.be.eql(defaultUser.email);
                    expect(res.body.data.status).to.be.eql(defaultRental.status);
                    done(err);        
                })
        })
    });

    describe('Route POST /api/rental', () => {
        it('should create a rental', done => {
            const newRental = {
                titleMovie: 'Default Movie',
                idUser: defaultRental.idUser,
                status: 'rented'
            }
            request
                .post('/api/rentals')
                .send(newRental)
                .end((err, res) => {
                    expect(res.body.data.id).to.have.lengthOf(36);
                    done(err);
                });
        })
    });

    describe('Route PUT /api/rentals/{id}', () => {
        it('should edit a rental', done => {
            
            const updatedRental = {
                status: 'returned'
            }

            request
                .put('/api/rentals/14dbd0cf-56fd-46f8-a5eb-971c844f0024')
                .send(updatedRental)
                .end((err, res) => {
                    expect(res.body.success).to.be.eql(true);
                    done(err);
                })
        })
    });

    describe('Route DELETE /api/rentals/{id}', () => {
        it('should delete a rental', done => {

            request
                .delete('/api/rentals/14dbd0cf-56fd-46f8-a5eb-971c844f0024')
                .end((err, res) => {
                    expect(res.body.success).to.be.eql(true);
                    done(err);
                })
        })
    });


})