require('dotenv').config();

const chai = require('chai');
const knex = require('../../src/config/db');

global.expect = chai.expect;
global.knex = knex;

