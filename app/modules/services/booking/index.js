const Validator = require('../../../helpers/validateSchema');
const { BookingModel } = require('../../models');
const { BookingRepository } = require('../../repositories');
const { UnprocessableEntityError, BadRequestError, NotFoundError } = require('../../../helpers/exceptions');
const { CreateDate, IsDateInPast, DateDiff } = require('../../../helpers/utils');
const { ObjectId } = require('../../../libraries/db/mongoDb');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const MAX_BOOKS_BORROWED = process.env.MAX_BOOKS_BORROWED || 5;
const MAX_BOOKING = process.env.MAX_BOOKING || 5;
const MAX_DAYS_BOOKING = process.env.MAX_DAYS_BOOKING || 3;

const bookingData = (payload, isUpdate = false, other = {}) => {
    const now = CreateDate();
    let defaultData = {
        ...other,
        createdAt: now,
    };
    if (isUpdate) defaultData.updatedAt = now;
    if (payload.startDate) payload.startDate = CreateDate(payload.startDate);
    if (payload.endDate) payload.endDate = CreateDate(payload.endDate);
    return { ...payload, ...defaultData };
};

const BOOKING_STATUS = ['approved', 'rejected', 'pending', 'done'];

const removeDuplicateList = (list, key = 'bookKey') => {
    return [...new Map(list.map((item) => [item[key], item])).values()];
};

const validateBookingProcess = (payload, isEdit = false) => {
    const howLong = DateDiff(payload.endDate, payload.startDate);
    if (!isEdit && IsDateInPast(payload.startDate)) {
        throw new BadRequestError(`Dont stuck in the past, there is still a lot of sand in the ocean`);
    }
    if (howLong > MAX_DAYS_BOOKING || Math.sign(howLong) === -1) {
        throw new BadRequestError(`You can only borrow maximal for ${MAX_DAYS_BOOKING} days`);
    }

    if (payload.list.length > MAX_BOOKS_BORROWED) {
        throw new BadRequestError(`You can only borrow maximal ${MAX_BOOKS_BORROWED} books`);
    }
};

const Services = {
    createBooking: async (payload) => {
        let booking = await Validator.validateSchema(payload, BookingModel.POST);
        validateBookingProcess(payload);

        const queryListBorrowed = {
            userId: payload.userId,
            status: { $ne: 'done' },
        };
        const isAllowedToBorrow = await BookingRepository.findBooking(queryListBorrowed);
        if (isAllowedToBorrow && isAllowedToBorrow.length > MAX_BOOKING) {
            throw new BadRequestError(`You borrow too much`);
        }
        const listOfBookKey = payload.list.map((item) => item.bookKey);
        const isExist = await BookingRepository.isBookingExist(payload.userId, listOfBookKey);
        if (isExist) {
            throw new UnprocessableEntityError(`Please check you list, one/some of them is still you borrowed`);
        }

        //ensure no duplicate entries by book key
        booking.list = removeDuplicateList(booking.list);

        const dataBooking = bookingData(booking);

        return await BookingRepository.save(dataBooking);
    },

    updateBooking: async (bookingId, payload) => {
        const booking = await Validator.validateSchema(payload, BookingModel.PUT);

        validateBookingProcess(payload, true);

        const listOfBookKey = payload.list.map((item) => item.bookKey);
        const query = {
            _id: ObjectId(bookingId),
            userId: payload.userId,
        };
        const isExist = await BookingRepository.findBooking(query);
        if (!isExist) {
            throw new NotFoundError('Booking Id is not found!');
        }

        //ensure no duplicate entries by book key
        booking.list = removeDuplicateList(booking.list);

        const dataBooking = bookingData(booking, false);

        return await BookingRepository.update(bookingId, dataBooking);
    },

    getBooking: async (bookingId) => {
        const booking = await BookingRepository.getById(bookingId);
        if (!booking) {
            throw new NotFoundError('Booking Id is not found!');
        }
        return booking;
    },

    getBookingBy: async (query, options) => {
        const booking = await BookingRepository.findBooking(query, options);
        if (!booking) {
            throw new NotFoundError('Booking Id is not found!');
        }
        return booking;
    },

    getAllBookings: async (query) => {
        const projection = {
            userId: 1,
            list: 1,
            startDate: 1,
            endDate: 1,
            status: 1,
        };
        const bookings = await BookingRepository.getAll(query, projection);
        if (bookings.length === 0) {
            throw new NotFoundError('No Data booking found!');
        }

        return bookings;
    },

    getTableBookings: async (query) => {
        const searchAbleFields = ['userId', 'list.bookKey', 'list.bookTitle', 'status', 'startDate', 'endDate'];

        const projection = {
            userId: 1,
            list: 1,
            startDate: 1,
            endDate: 1,
            status: 1,
        };

        return await BookingRepository.getTable(query, searchAbleFields, projection);
    },

    updateStatusBooking: async (bookingId, payload) => {
        const bookingStatus = await Validator.validateSchema(payload, BookingModel.PATCH);
        const isExist = await BookingRepository.getById(bookingId);
        if (!isExist) {
            throw new NotFoundError('Booking Id is not found!');
        }
        const canChanged = ['rejected', 'pending', 'cancelled'];
        if (isExist.status === 'approved' && canChanged.indexOf(bookingStatus.status) !== -1) {
            throw new UnprocessableEntityError(
                'The Booking is already approved, please return our book for new booking',
            );
        }
        if (isExist.status === 'done') {
            throw new UnprocessableEntityError('You cannot modify this boking anymore');
        }

        await BookingRepository.update(bookingId, bookingStatus);

        return bookingStatus;
    },

    deleteBooking: async (bookingId) => {
        const { value } = await BookingRepository.delete(bookingId);
        if (!value) {
            throw new BadRequestError('Booking Id is not found or book(s) still borrowed!');
        }

        return value;
    },
};

module.exports = Services;
