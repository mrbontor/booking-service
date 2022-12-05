const { Router } = require('express');

const App = new Router();

const UserApi = require('./users');
const OpenLibrary = require('./openLibrary');
const BookingApi = require('./booking');

App.use('/users', UserApi);
App.use('/books', OpenLibrary);
App.use('/bookings', BookingApi);

module.exports = App;
