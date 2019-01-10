/* Lib para .env */
require('dotenv').config();

/* Dependencias */
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const Authenticate = require('./Authenticate');

/* Rotas */
const moviesRoutes = require('./routes/movie');
const rentalsRoutes = require('./routes/rental');
const usersRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

/* Inicialização do Express app */
const app = express();

/* Inicialicação da Autenticação */
const auth = Authenticate();

/* Utilidades do Express */
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json({
  limit: process.env.BODY_LIMIT_SIZE,
}));
app.use(auth.initialize());

/* Declaracao das rotas */
app.use('/api/movies', auth.authenticate(), moviesRoutes);
app.use('/api/rentals', auth.authenticate(), rentalsRoutes);
app.use('/api/users', auth.authenticate(), usersRoutes);
app.use('/api/token', authRoutes);
app.all('*', (req, res) => {
  res.status(404).send({
    success: false,
    status: '404',
  });
});

module.exports = app;
