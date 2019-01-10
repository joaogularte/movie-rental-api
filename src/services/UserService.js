const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const UserModel = require('../models/UserModel');

class UserService {
  /**
   * Retorna uma lista de rodos os usuarios.
   */
  static async list() {
    const users = await UserModel.list();
    return users;
  }

  /**
   * Retorna o usuario que tiver o id igual a userId.
   * Caso o usuario não exista, retorna null 
   */
  static async get(userId) {
    const user = await UserModel.get(userId);
    if (!user[0]) {
      return null;
    }
    return user[0];
  }

  /**
   * Inseri um novo usuario, abribuindo um numero uuid ao id do usuario inserido, assim como,
   * realiza a criptação da senha
   * Retorna o id do usuario inserido 
   */
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

   /**
   * Altera o usuario que tiver o id igual a userId e retorna true,
   * Caso o usuario não exista, retorna false;
   */
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

  /**
   * Deleta o usuario que tiver o id igual a userId e retorna true,
   * Caso o usuario não exista, retorna false;
   */
  static async delete(userId) {
    const user = await UserModel.get(userId);
    if (!user[0]) {
      return false;
    }
    await UserModel.delete(userId);
    return true;
  }

  /**
   * Retorna o usuario que tiver o id igual a userId.
   * Compara a hash do usario achado com o parametro password, retorna resultado
   * Caso o usuario não exista, retorna false
   */
  static async isPassword(userId, password) {
    const user = await UserModel.get(userId);
    if (!user[0]) {
      return false;
    }

    const result = bcrypt.compareSync(password, user[0].password);
    return result;
  }

  /**
   * Retorna o usuario que tiver o email igual a emailUser.
   * Caso o usuario não exista, retorna null 
   */
  static async getByEmail(emailUser) {
    const user = await UserModel.getByEmail(emailUser);
    if (!user[0]) {
      return null;
    }
    return user[0];
  }
}

module.exports = UserService;
