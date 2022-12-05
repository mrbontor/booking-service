const { BookingService } = require('../../services');
const ResponseHelper = require('../../../helpers/response');

module.exports = {
    createBooking: async (req, res) => {
        try {
            const data = await BookingService.createBooking(req.body);

            ResponseHelper.success(res, data);
        } catch (err) {
            console.error(`[CREATE][BOOKING] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    updateInfoBooking: async (req, res) => {
        try {
            const data = await BookingService.updateBooking(req.params.bookingId, req.body);
            ResponseHelper.success(res, data);
        } catch (err) {
            console.error(`[UPDATE][BOOKING] >>>>> ${JSON.stringify(err.stack)}`);
            ResponseHelper.error(res, err);
        }
    },
    getBooking: async (req, res) => {
        try {
            const data = await BookingService.getBooking(req.params.bookingId);
            ResponseHelper.success(res, data);
        } catch (err) {
            console.error(`[GET][ONE][BOOKING] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },
    getAllBookings: async (req, res) => {
        try {
            const data = await BookingService.getAllBookings(req.query);
            ResponseHelper.success(res, data);
        } catch (err) {
            console.error(`[GET][ALL][BOOKINGS] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },

    getTableBookings: async (req, res) => {
        try {
            const data = await BookingService.getTableBookings(req.query);
            ResponseHelper.success(res, data);
        } catch (err) {
            console.error(`[GET][TABLE][BOOKINGS] >>>>> ${JSON.stringify(err.stack)}`);
            ResponseHelper.error(res, err);
        }
    },

    updateStatusBooking: async (req, res) => {
        try {
            const data = await BookingService.updateStatusBooking(req.params.bookingId, req.body);
            ResponseHelper.success(res, data);
        } catch (err) {
            console.error(`[UPDATE][BOOKING] >>>>> ${JSON.stringify(err.stack)}`);
            ResponseHelper.error(res, err);
        }
    },

    deleteBooking: async (req, res) => {
        try {
            await BookingService.deleteBooking(req.params.bookingId);
            ResponseHelper.noContent(res);
        } catch (err) {
            console.error(`[DELETE][BOOKING] >>>>> ${JSON.stringify(err.stack)}`);
            ResponseHelper.error(res, err);
        }
    },
};
