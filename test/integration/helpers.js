const supertest = require('supertest');
const chai      = require('chai');
const app       = require('../../src/app');

global.app = app;
global.expect = chai.expect;
global.request = supertest(app);