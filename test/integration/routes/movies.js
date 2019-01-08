const knex = require('../../../src/config/db');

/* Descrição geral do teste*/
describe('Routes Movies', () => {

    const defaultMovie = {
        id: 'd1b039e8-997b-4bdf-8a20-1fae7c1c7c0d',
        title: 'Default Movie',
        director: 'Director of Default Movie',
        quantities: 1
    }

    beforeEach(done => {
        knex.from('movies').del().then(() => {
            knex.from('movies').insert(defaultMovie).then(() => {
                done();
            })
        })
    });

    describe('Route GET /api/movies', () => {
        it('should return a list of movies', done => {
            request
                .get('/api/movies')
                .end((err, res) => {
                    
                    expect(res.body.data[0].id).to.be.eql(defaultMovie.id);
                    expect(res.body.data[0].title).to.be.eql(defaultMovie.title);
                    expect(res.body.data[0].director).to.be.eql(defaultMovie.director);
                    expect(res.body.data[0].quantities).to.be.eql(defaultMovie.quantities);

                    done(err);
                })
        })
    });

    describe('Route GET /api/movies/{id}', () => {
        it('should return a movie', done => {
            request
                .get('/api/movies/d1b039e8-997b-4bdf-8a20-1fae7c1c7c0d')
                .end((err, res) => {

                    expect(res.body.data.id).to.be.eql(defaultMovie.id);
                    expect(res.body.data.title).to.be.eql(defaultMovie.title);
                    expect(res.body.data.director).to.be.eql(defaultMovie.director);
                    expect(res.body.data.quantities).to.be.eql(defaultMovie.quantities);

                    done(err);
                })
        })
    });

    describe('Route POST /api/movies', () => {
        it('should create a movie', done => {

            const newMovie = {
                title: 'New Movie',
                director: 'Director of New Movie',
                quantities: 1
            }

            request
                .post('/api/movies')
                .send(newMovie)
                .end((err, res) => {
                    expect(res.body.data.id).to.have.lengthOf(36);
                    done(err);
                })
        })
    });

    describe('Route PUT /api/movies/{id}', () => {
        it('should edit a movie', done => {
            const updatedMovie = {
                title: 'Updated Movie',
                director: 'Director of Updated Movie',
                quantities: 2
            }

            request
                .put('/api/movies/d1b039e8-997b-4bdf-8a20-1fae7c1c7c0d')
                .send(updatedMovie)
                .end((err, res) => {
                    expect(res.body.success).to.be.eql(true);
                    done(err);
                })
        })
    });

    describe('Route DELETE /api/movies/{id}', () => {
        it('should delete a movie', done => {

            request
                .delete('/api/movies/d1b039e8-997b-4bdf-8a20-1fae7c1c7c0d')
                .end((err, res) => {
                    expect(res.body.success).to.be.eql(true);
                    done(err);
                })
        })
    });
})