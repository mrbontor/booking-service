const express = require('express');
const App = express();

const { BookingController } = require('../../../modules/controllers');

App.get('/', BookingController.getAllBookings)
    .post('/', BookingController.createBooking)
    .get('/table', BookingController.getTableBookings)
    .patch('/status/:bookingId', BookingController.updateStatusBooking)
    .get('/:bookingId', BookingController.getBooking)
    .put('/:bookingId', BookingController.updateInfoBooking)
    .delete('/:bookingId', BookingController.deleteBooking);

module.exports = App;
