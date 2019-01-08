const MovieService = require('../services/MovieService');

class MovieController {
    static async list(req, res) {
        try {
            const movies = await MovieService.list();
            res.status(200).send({ success: true, data: movies })
        } catch(err) {
            res.status(500).send({ success: false, message: 'Internal server failure'})
        }
    }

    static async get(req, res) {
        try {
            const movie = await MovieService.get(req.params.id);
            if (movie) {
                res.status(200).send({ success: true, data: movie })
            } else {
                res.status(200).send({ success: false, message: 'Movie not found' })
            }
        } catch(err) {
            res.status(500).send({ success: false, message: 'Internal server failure'});
        }
    }

    static async post(req, res) {
        try {
            const id = await MovieService.post(req.body);
            res.status(201).send({ success: true, data: id })
        } catch (err) {
            res.status(500).send({ success: false, message: 'Internal server failure'});
        }
        
    }

    static async put(req, res){
        try {
            const updated = await MovieService.put(req.params.id, req.body);
            if (updated) {
                res.status(200).send({ success: true });
            } else {
                res.status(200).send({ success: false, message: 'Movie not found' })
            }
        } catch (err) {
            res.status(500).send({ success:false, message: 'Internal server failure'});
        }
    }

    static async delete(req, res){
        try {
            const deleted = await MovieService.delete(req.params.id);
            if (deleted) {
                res.status(200).send({ success: true })
            } else {
                res.status(200).send({ success: false, message: 'Movie not found' })
            }
        } catch (err) {
            res.status(500).send({ success:false, message: 'Internal server failure'});
        }
    }


}


module.exports = MovieController;