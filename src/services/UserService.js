const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const UserModel = require('../models/UserModel');

class UserService{

    static async list(){
        const users = await UserModel.list();
        return users;
    }


    static async get(userId){
        const user = await UserModel.get(userId);
        if(!user){
            return null
        }
        return user[0];
    }

    static async post(data){
        const id = uuidv4();

        const salt = bcrypt.genSaltSync();

        const password = bcrypt.hashSync(data.password, salt);
        const user = {
            id: id,
            name: data.name,
            email: data.email,
            password: password,
            role: data.role
        }
        await UserModel.post(user);
        return user.id;
    }

    static async put(userId, data){
        const user = await UserModel.get(userId);
        if(!user){
            return false;
        }
        await UserModel.put(userId, data);
        return true;
    }

    static async delete(userId){
        const user = await UserModel.get(userId);
        if(!user){
            return false;
        }
        await UserModel.delete(userId);
        return true;
    }

    static async isPassword(userId, password){
        const user = await UserModel.get(userId);
        if(!user){
            return false;
        }

        const result = bcrypt.compareSync(password, user[0].password);
        return result;
    }


}

module.exports = UserService;