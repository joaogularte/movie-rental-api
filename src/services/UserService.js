const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const UserModel = require('../models/UserModel');

class UserService {
  static async list() {
    const users = await UserModel.list();
    return users;
  }


  static async get(userId) {
    const user = await UserModel.get(userId);
    if (!user[0]) {
      return null;
    }
    return user[0];
  }

  static async post(data) {
    const id = uuidv4();

    const salt = bcrypt.genSaltSync();

    const password = bcrypt.hashSync(data.password, salt);
    const user = {
      id,
      name: data.name,
      email: data.email,
      password,
    };
    await UserModel.post(user);
    return { id: user.id };
  }

  static async put(userId, data) {
    const user = await UserModel.get(userId);
    if (!user[0]) {
      return false;
    }
    const salt = bcrypt.genSaltSync();
    const password = bcrypt.hashSync(data.password, salt);
    const updatedUser = {
      name: data.name,
      email: data.email,
      password,
    };
    await UserModel.put(userId, updatedUser);
    return true;
  }

  static async delete(userId) {
    const user = await UserModel.get(userId);
    if (!user[0]) {
      return false;
    }
    await UserModel.delete(userId);
    return true;
  }

  static async isPassword(userId, password) {
    const user = await UserModel.get(userId);
    if (!user[0]) {
      return false;
    }

    const result = bcrypt.compareSync(password, user[0].password);
    return result;
  }

  static async getByEmail(emailUser) {
    const user = await UserModel.getByEmail(emailUser);
    if (!user[0]) {
      return null;
    }
    return user[0];
  }
}

module.exports = UserService;
