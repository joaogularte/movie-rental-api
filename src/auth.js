const passport = require('passport');
const {Strategy, ExcractJwt } = require('passport-jwt');
const User = require('../src/models/UserModel');
const secret = require('../src/config/secret');
const opts = secret.jwtSecret;

class Auth {
    const strategy; 
}