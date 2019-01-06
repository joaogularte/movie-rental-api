const MovieService = require('../services/MovieService');
const uuidv4 = require('uuid/v4');
class MovieController {
    static async list(req, res){
        try{
            const movies = await MovieService.list();
            res.send({
                success: true,
                data: movies
            })
        }catch(err){
            res.status(500).send({ success: false, message: 'Internal server failure'})
        }
    }

    static async get(req, res){
        try{
            const movie = await MovieService.get(req.params.id);
            if(movie){
                res.send({
                    success: true,
                    data: movie
                })
            }else{
                res.send({
                    success: false,
                    message: 'Movie not found'
                })
            }
        }catch(err){
            res.status(500).send({ success: false, message: 'Internal server failure'});
        }
    }

    static async post(req, res){
        const id = uuidv4();
        req.body.id = id;
        const movie = await MovieService.post(req.body);
        res.send({
            success: true,
            data: {
                id
            }
        })
    }

    static async put(req, res){
        const data = req.body;
        const movieId = req.params.id;

        try{
            const updated = await MovieService.put(movieId, data);
            if(updated){
                res.send({
                    success: true
                })
            }else{
                res.send({
                    success: false,
                    message: 'Movie not found'
                })
            }
        }catch(err){
            res.status(500).send({ success:false, message: 'Internal server failure'});
        }
    }

    static async delete(req, res){
        const movieId = req.params.id;

        try{
            const deleted = await MovieService.delete(movieId);
            if(deleted){
                res.send({
                    success: true
                })
            }else{
                res.send({
                    success: false,
                    message: 'Movie not found'
                })
            }
        }catch(err){
            res.status(500).send({ success:false, message: 'Internal server failure'});
        }
    }


}


module.exports = MovieController;