const MovieService = require('../services/MovieService');

class MovieController {
    static async list(req, res){
        try{
            const movies = await MovieService.list();
            res.status(200).send({
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
                res.status(200).send({
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
        try {
            const id = await MovieService.post(req.body);
            res.status(201).send({
                success: true,
                data:{ id: id}
            })
        } catch (err) {
            res.status(500).send({ success: false, message: 'Internal server failure'});
        }
        
    }

    static async put(req, res){
        const data = req.body;
        const movieId = req.params.id;

        try{
            const updated = await MovieService.put(movieId, data);
            if(updated){
                res.status(200).send({
                    success: true
                })
            }else{
                res.status(200).send({
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
                res.status(200).send({
                    success: true
                })
            }else{
                res.status(200).send({
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