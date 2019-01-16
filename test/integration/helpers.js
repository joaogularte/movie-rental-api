const supertest = require('supertest');
const chai = require('chai');
const app = require('../../src/app');
const knex = require('../../src/config/db');

global.app = app;
global.expect = chai.expect;
global.request = supertest(app);
global.knex = knex;