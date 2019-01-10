const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const User = require('./models/UserModel');
const secret = require('./config/secret');

const opts = {};
opts.secretOrKey = secret.jwtSecret;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');


module.exports = () => {
  const strategy = new Strategy(opts, async (payload, done) => {
    const user = await User.get(payload.id);
    if (user) {
      return done(null, {
        id: user[0].id,
        email: user[0].email,
      });
    }
    return done(null, false);
  });

  passport.use(strategy);


  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', secret.jwtSession),
  };
};
