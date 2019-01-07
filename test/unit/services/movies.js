const MovieService = require('../../../src/services/MovieService');

describe('Services Movies', () => {
    
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
    
    describe('Get all movies: list()', () => {
        it('should return a list of movies', () => {
        
            const expetedMovie = [{
                id: 'd1b039e8-997b-4bdf-8a20-1fae7c1c7c0d',
                title: 'Default Movie',
                director: 'Director of Default Movie',
                quantities: 1
            }]
            MovieService.list()
                .then(movies => {
                    expect(movies).to.be.eql(expetedMovie);
                })
        })
    })
});