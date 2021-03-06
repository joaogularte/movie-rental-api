/* Configuração e inicialização do banco de dados */
const config = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};
const knex = require('knex')(config);

module.exports = knex;
