const express = require('express');
const App = express();

const { BookingController } = require('../../../modules/controllers');

App.post('/', BookingController.createBooking);

const { VerifyToken } = require('../../../modules/middleware');
App.use(VerifyToken.verifyToken);

App.get('/', BookingController.getAllBookings)

    .get('/table', BookingController.getTableBookings)
    .patch('/status/:bookingId', BookingController.updateStatusBooking)
    .get('/:bookingId', BookingController.getBooking)
    .put('/:bookingId', BookingController.updateInfoBooking)
    .delete('/:bookingId', BookingController.deleteBooking);

module.exports = App;
