const UserService = require('../services/UserService');

const errorResponse = { success: false, message: 'Internal server failure' };

class UserController {
   /**
   * Retorna uma lista todos os usuarios 
   */
  static async list(req, res) {
    try {
      const users = await UserService.list();
      res.status(200).send({ success: true, data: users });
    } catch (err) {
      res.status(500).send(errorResponse);
    }
  }

  /**
   * Retorna um usuario, onde o id do usario for igual ao parametro userID,
   * Caso o usuario não exista retorne User not found
   */
  static async get(req, res) {
    try {
      const userId = req.joi.params.id;
      const user = await UserService.get(userId);
      if (user) {
        res.status(200).send({ success: true, data: user });
      } else {
        res.status(200).send({ success: false, message: 'User not found' });
      }
    } catch (err) {
      res.status(500).send(errorResponse);
    }
  }

  /**
   * Adicionada um usuario 
   */
  static async post(req, res) {
    try {
      const user = req.joi.body;
      const id = await UserService.post(user);
      res.status(201).send({ success: true, data: id });
    } catch (err) {
      res.status(500).send(errorResponse);
    }
  }

  /**
   * Altera o usuario que tiver o id igual ao paremetro userId,
   * Caso o usuario não exista retorne User not found
   */
  static async put(req, res) {
    try {
      const userId = req.joi.params.id;
      const updatedUser = req.joi.body;

      const updated = await UserService.put(userId, updatedUser);
      if (updated) {
        res.status(200).send({ success: true });
      } else {
        res.status(200).send({ success: true, message: 'User not found' });
      }
    } catch (err) {
      res.status(500).send(errorResponse);
    }
  }

   /**
   * Deleta o usuario que tiver o id igual ao paremetro userId,
   * Caso o usuario não exista retorne User not found
   */
  static async delete(req, res) {
    try {
      const userId = req.joi.params.id;

      const deleted = await UserService.delete(userId);
      if (deleted) {
        res.status(200).send({ success: true });
      } else {
        res.status(200).send({ success: false, message: 'User not found' });
      }
    } catch (err) {
      res.status(500).send(errorResponse);
    }
  }
}

module.exports = UserController;
