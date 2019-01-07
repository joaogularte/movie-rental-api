const UserService = require('../services/UserService');

class UserController{
    static async list(req, res){
        try{
            const users = await UserService.list();
            res.status(200).send({
                success: true,
                data: users
            })
        }catch(err){
            res.status(500).send({ success: false, message: 'Internal server failure'})
        }
    }
}

module.exports = UserController;