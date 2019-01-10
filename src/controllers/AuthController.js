const AuthService = require('../services/AuthService');
const responseError = require('./helpers');

class AuthController {
  /**
   * Cria um JWT para autenticação
   */
  static async post(req, res) {
    try {
      const credentials = req.joi.body;
      const auth = await AuthService.post(credentials);
      if (auth) {
        res.status(200).send({ success: true, data: auth });
      } else {
        res.status(401).send({ success: false, message: 'Unauthorized' });
      }
    } catch (err) {
      res.status(500).send(responseError);
    }
  }
}

module.exports = AuthController;
