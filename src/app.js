/* Lib para .env */
require('dotenv').config();

/* Dependencias */
const express       = require('express');
const cors          = require('cors');
const compression   = require('compression');
const helmet        = require('helmet');
const bodyParser    = require('body-parser');

/* Rotas */
const moviesRoutes    = require('./routes/movie');
const rentalsRoutes   = require('./routes/rental');

/* Inicialização do Express app */
const app = express();

/* Utilidades do Express */
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json({
    limit: process.env.BODY_LIMIT_SIZE
}));

/* Declaracao das rotas */
app.use('api/movies', moviesRoutes);
app.use('api/rentals', rentalsRoutes);

app.all('*', (req, res) => {
    res.status(404).send({
        success: false,
        status: '404'
    })
});

module.exports = app;