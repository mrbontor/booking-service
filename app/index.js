const Express = require('express');
const App = Express();

// Initialize config file
require('dotenv').config();

process.env.TZ = 'Asia/Jakarta';

const DbCon = require('../app/libraries/db/mongoDb');
DbCon.connect();

const Router = require('./api');
App.use('/api', Router);

module.exports = App;
