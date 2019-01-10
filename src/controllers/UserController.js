const UserService = require('../services/UserService');

const errorResponse = { success: false, message: 'Internal server failure' };

class UserController {
  static async list(req, res) {
    try {
      const users = await UserService.list();
      res.status(200).send({ success: true, data: users });
    } catch (err) {
      res.status(500).send(errorResponse);
    }
  }

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

  static async post(req, res) {
    try {
      const user = req.joi.body;
      const id = await UserService.post(user);
      res.status(201).send({ success: true, data: id });
    } catch (err) {
      res.status(500).send(errorResponse);
    }
  }

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
