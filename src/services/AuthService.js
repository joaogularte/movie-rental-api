const jwt = require('jwt-simple');
const UserService = require('./UserService');
const secret = require('../config/secret');

class AuthService {
  /**
   * Cria um JWT para autenticação
   */
  static async post(credentials) {
    const email = credentials.email;
    const password = credentials.password;
    const user = await UserService.getByEmail(email);
    if (!user) {
      return false;
    }
    const isPassword = await UserService.isPassword(user.id, password);
    if (isPassword) {
      const payload = { id: user.id };
      return jwt.encode(payload, secret.jwtSecret);
    }
    return false;
  }
}

module.exports = AuthService;
