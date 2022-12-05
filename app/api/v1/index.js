const { Router } = require('express');

const App = new Router();

const UserApi = require('./users');
const OpenLibrary = require('./openLibrary');
const BookingApi = require('./booking');
const AuhtApi = require('./auth');

App.use('/users', UserApi);
App.use('/books', OpenLibrary);
App.use('/bookings', BookingApi);
App.use('/auth', AuhtApi);

module.exports = App;
