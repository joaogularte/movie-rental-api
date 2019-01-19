require('dotenv').config();

const chai = require('chai');
const knex = require('../../src/config/db');
chai.use(require('chai-uuid'));

global.expect = chai.expect;
global.knex = knex;
