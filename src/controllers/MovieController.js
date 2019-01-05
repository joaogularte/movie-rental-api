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
                    message: 'User not found'
                })
            }
        }catch(err){
            res.status(500).send({ success: false, message: 'Internal server failure'})
        }
    }

    static async post(req, res){
        req.body.id = uuidv4();
        const movie = await MovieService.post(req.body);
        res.send({
            success: true,
            data: movie
        })
    }


}


module.exports = MovieController;