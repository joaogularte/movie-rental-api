/* Lib para .env */
require('dotenv').config();

/* Dependencias */
const express       = require('express');
const cors          = require('cors');
const compression   = require('compression');
const helmet        = require('helmet');
const bodyParser    = require('body-parser');
/* Inicialização do Express app */
const app = express();

/* Utilidades do Express */
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json({
    limit: process.env.BODY_LIMIT_SIZE
}));


