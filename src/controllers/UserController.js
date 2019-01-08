const UserService = require('../services/UserService');
const errorResponse = { success: false, message: 'Internal server failure' }

class UserController{
    static async list(req, res) {
        try {
            const users = await UserService.list();
            res.status(200).send({ success: true, data: users })
        } catch(err) {
            res.status(500).send(errorResponse);
        }
    }
    
    static async get(req, res) {
        try {
            const user = await UserService.get(req.params.id);
            if (user) {
                res.status(200).send({ success: true, data: user })
            } else {
                res.status(200).send({ success: false, message: 'User not found' })
            }
        } catch (err) {
            res.status(500).send(errorResponse);
        }
    }

    static async post(req, res) {
        try {
            const id = await UserService.post(req.body);
            res.status(201).send({ success: true, data: id })
        } catch (err) {
            res.status(500).send(errorResponse);
        }
    }

    static async put(req, res) {
        try {
            const updated = await UserService.put(req.params.id, req.body);
            if (updated) {
                res.status(200).send({ success: true })
            } else {
                res.status(200).send({ success: true, message: 'User not found'})
            }
        } catch (err) {
            res.status(500).send(errorResponse);
        }
    }

    static async delete(req, res) {
        try {
            const deleted = await UserService.delete(req.params.id);
            if (deleted) {
                res.status(200).send({ success: true});
            } else {
                res.status(200).send({ success: false, message: 'User not found'})
            }
        } catch (err) {
            res.status(500).send(errorResponse);
        }
    }
}

module.exports = UserController;