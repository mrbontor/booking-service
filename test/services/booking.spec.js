const chai = require('chai');
const expect = chai.expect;

const chaiaspromise = require('chai-as-promised');
chai.use(chaiaspromise);

const sinon = require('sinon');
const dayjs = require('dayjs');

const { BookingService } = require('../../app/modules/services');
const Validator = require('../../app/helpers/validateSchema');
const { BookingModel } = require('../../app/modules/models');
const { BookingRepository } = require('../../app/modules/repositories');

const mockBooking = require('../mocks/booking');
const mockBookingTable = require('../mocks/bookingTable');

const MAX_BOOKS_BORROWED = process.env.MAX_BOOKS_BORROWED || 5;
const MAX_BOOKING = process.env.MAX_BOOKING || 5;
const MAX_DAYS_BOOKING = process.env.MAX_DAYS_BOOKING || 3;

let now = dayjs();
const formatDay = 'YYYY-MM-DD hh:mm:ss';
let bookingId = '638c8691b1a20b1247f0ede0';

describe('Booking Service', function () {
    let payload = {
        userId: '638c85b7bedda18dfa65fdd8',
        list: [
            {
                bookKey: '/works/OL1859783W',
                bookTitle: 'The Artificial Kingdom',
            },
            {
                bookKey: '/works/OL4279057W',
                bookTitle: 'The Old Neighborhood',
            },
            {
                bookKey: '/works/OL4279057W',
                bookTitle: 'The Old Neighborhood',
            },
        ],
    };

    let validatorStub, findBookingStub,  isBookingExistStub, saveStub, getByIdStub, getTableStub, updateStub;
    let response = {};

    beforeEach(async () => {
        validatorStub = sinon.spy(Validator, 'validateSchema');
        findBookingStub = sinon.stub(BookingRepository, 'findBooking');
        isBookingExistStub = sinon.stub(BookingRepository, 'isBookingExist');
        saveStub = sinon.stub(BookingRepository, 'save');
        getByIdStub = sinon.stub(BookingRepository, 'getById');
        getTableStub = sinon.stub(BookingRepository, 'getTable');
        updateStub = sinon.stub(BookingRepository, 'update');
        deleteStub = sinon.stub(BookingRepository, 'delete');
    });

    afterEach(() => {
        validatorStub.restore();
        findBookingStub.restore();
        isBookingExistStub.restore();
        saveStub.restore();
        getByIdStub.restore();
        getTableStub.restore();
        updateStub.restore();
        deleteStub.restore();
    });

    describe('Create Booking', () => {
        it('Success create', async () => {
            payload.startDate = now.set('date', now.get('date') + 1).format(formatDay);
            payload.endDate = now.set('date', now.get('date') + 2).format(formatDay);

            saveStub.returns(mockBooking[0]);
            
            response = await BookingService.createBooking(payload);

            expect(validatorStub.calledOnce).to.be.true;
            expect(findBookingStub.calledOnce).to.be.true;
            expect(isBookingExistStub.calledOnce).to.be.true;
            expect(saveStub.calledOnce).to.be.true;

            expect(response).to.have.property('_id');
            expect(response.userId).to.equal(payload.userId);
            expect(response).to.have.property('startDate');
            expect(response).to.have.property('endDate');
            expect(response).to.have.property('list').to.have.lengthOf.at.least(1);
            expect(response).to.have.property('status').to.equal('pending');
            expect(response).to.have.property('createdAt');
        });

        it('Validation Error', async () => {
            payload.list = [];
            try {
                await Validator.validateSchema(payload, BookingModel.POST);
            } catch (error) {
                expect(validatorStub.calledOnce).to.be.true;
                expect(findBookingStub.calledOnce).to.be.false;
                expect(isBookingExistStub.calledOnce).to.be.false;
                expect(saveStub.calledOnce).to.be.false;
                
                expect(error.status).to.equal(false);
                expect(error.errors).to.have.lengthOf.at.least(1);
                expect(error.statusCode).to.equal(400);
                expect(error.message).to.equal('Validation Error!');
            }
        });

        it('Invalid Date Ranges', async () => {
            payload.list = [
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
            ];
            payload.startDate = now.set('date', -2).format(formatDay);
            payload.endDate = now.set('date', +1).format(formatDay);

            // findBookingStub.returns([{}])
            try {
                await BookingService.createBooking(payload);
            } catch (error) {
                expect(findBookingStub.calledOnce).to.be.false;
                expect(isBookingExistStub.calledOnce).to.be.false;
                expect(saveStub.calledOnce).to.be.false;

                expect(error.status).to.equal(false);
                expect(error.errors).to.equal(null);
                expect(error.statusCode).to.equal(400);
                expect(error.message).to.equal('Dont stuck in the past, there is still a lot of sand in the ocean');
            }
        });

        it('Invalid Book request, max book borrowed error', async () => {
            payload.list = [
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
            ];
            payload.startDate = now.set('date', now.get('date') + 1).format(formatDay);
            payload.endDate = now.set('date', now.get('date') + 10).format(formatDay);
            try {
                await BookingService.createBooking(payload);
            } catch (error) {
                expect(validatorStub.calledOnce).to.be.true;
                expect(findBookingStub.calledOnce).to.be.false;
                expect(isBookingExistStub.calledOnce).to.be.false;
                expect(saveStub.calledOnce).to.be.false;

                expect(error.status).to.equal(false);
                expect(error.errors).to.equal(null);
                expect(error.statusCode).to.equal(400);
                expect(error.message).to.equal(`You can only borrow maximal for ${MAX_DAYS_BOOKING} days`);
            }
        });

        it('Validation Error Max Item List', async () => {
            payload.list = [
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
            ];
            payload.startDate = now.set('date', now.get('date') + 1).format(formatDay);
            payload.endDate = now.set('date', now.get('date') + 2).format(formatDay);
            try {
                await BookingService.createBooking(payload);
            } catch (error) {
                expect(validatorStub.calledOnce).to.be.true;
                expect(error.status).to.equal(false);
                expect(error.errors).to.equal(null);
                expect(error.statusCode).to.equal(400);
                expect(error.message).to.equal(`You can only borrow maximal ${MAX_BOOKS_BORROWED} books`);
            }
        });
    });

    describe('Get One Booking', function () {
        it('Success GET', async () => {
            const bookingId = '638c8691b1a20b1247f0ede0';

            getByIdStub.returns(mockBooking[0]);
            response = await BookingService.getBooking(bookingId);

            expect(getByIdStub.calledOnce).to.be.true;

            expect(response).to.have.property('_id').to.equal(bookingId);
            expect(response.userId).to.equal(payload.userId);
            expect(response).to.have.property('startDate');
            expect(response).to.have.property('endDate');
            expect(response).to.have.property('list').to.have.lengthOf.at.least(1);
            expect(response).to.have.property('status').to.equal('pending');
            expect(response).to.have.property('createdAt');
        });

        it('Error Not found', async () => {
            const bookingId = '';
            try {
               await BookingService.getBooking(bookingId);
            } catch (error) {
                expect(getByIdStub.calledOnce).to.be.true;
    
                expect(error.status).to.equal(false);
                expect(error.errors).to.equal(null);
                expect(error.statusCode).to.equal(404);
                expect(error.message).to.equal('Booking Id is not found!');
            }
        });
    });

    describe('Get Table Booking', function () {
        it('Success without filter', async () => {
            getTableStub.returns(mockBookingTable);
            response = await BookingService.getTableBookings();

            expect(getTableStub.calledOnce).to.be.true;

            expect(response).to.have.property('sort').to.have.property('updatedAt').to.equal('ASC');
            expect(response).to.have.property('page').to.equal(1);
            expect(response).to.have.property('size').to.equal(10);
            expect(response).to.have.property('totalRecord').to.equal(2);
            expect(response).to.have.property('totalPage').to.equal(1);
            expect(response).to.have.property('data').to.have.lengthOf.at.least(2)
        });

        it('Success with filter', async () => {

            let query = { userId: '638c85b7bedda18dfa65fdd8'}
            let newMock = mockBookingTable;
            newMock.data = mockBookingTable.data.filter(item => item.userId._id == query.userId )

            getTableStub.returns(newMock);
            response = await BookingService.getTableBookings(query);

            expect(getTableStub.calledOnce).to.be.true;

            expect(response).to.have.property('sort').to.have.property('updatedAt').to.equal('ASC');
            expect(response).to.have.property('page').to.equal(1);
            expect(response).to.have.property('size').to.equal(10);
            expect(response).to.have.property('totalRecord').to.equal(2);
            expect(response).to.have.property('totalPage').to.equal(1);
            expect(response).to.have.property('data').to.have.length(1)
        });

        it('Success with deep filter', async () => {

            let query = { userId: '638cdb32cf642a10585cef4c', search: 'Zeit'}
            let newMock = mockBookingTable;
            mockBookingTable.data.forEach((item, i) => {
                if(item.userId._id == query.userId){
                    newMock.data = item.list.filter(el => el.bookTitle.indexOf(query.search) >= 0)
                } 
            })
            getTableStub.returns(newMock);
            response = await BookingService.getTableBookings(query);
            expect(getTableStub.calledOnce).to.be.true;

            expect(response).to.have.property('sort').to.have.property('updatedAt').to.equal('ASC');
            expect(response).to.have.property('page').to.equal(1);
            expect(response).to.have.property('size').to.equal(10);
            expect(response).to.have.property('totalRecord').to.equal(2);
            expect(response).to.have.property('totalPage').to.equal(1);
            expect(response).to.have.property('data').to.have.length(1)
        });

        it('Success Not found', async () => {
            let query = { userId: '638cdb32cf642a10585cef4c1', search: 'Zeit'}
            let newMock = mockBookingTable;
            newMock.data = []
            getTableStub.returns(newMock);
            response = await BookingService.getTableBookings(query);
            expect(getTableStub.calledOnce).to.be.true;

            expect(response).to.have.property('sort').to.have.property('updatedAt').to.equal('ASC');
            expect(response).to.have.property('page').to.equal(1);
            expect(response).to.have.property('size').to.equal(10);
            expect(response).to.have.property('totalRecord').to.equal(2);
            expect(response).to.have.property('totalPage').to.equal(1);
            expect(response).to.have.property('data').to.have.length(0)
        });
    });

    describe('Upadate Booking', function () {
        let payloadUpdate = {
            userId: "638c85b7bedda18dfa65fdd8",
            list: [
                {
                    bookKey: '/works/OL1859783W',
                    bookTitle: 'The Artificial Kingdom',
                },
            ],
        };
        it('Success', async () => {
            payloadUpdate.startDate = now.set('date', now.get('date') + 1).format(formatDay);
            payloadUpdate.endDate = now.set('date', now.get('date') + 2).format(formatDay);

            findBookingStub.returns(mockBooking[0]);
            updateStub.returns(mockBooking[0]);
            response = await BookingService.updateBooking(bookingId, payloadUpdate);
                
            expect(validatorStub.calledOnce).to.be.true;
            expect(findBookingStub.calledOnce).to.be.true;
            expect(updateStub.calledOnce).to.be.true;

            expect(response).to.have.property('_id');
            expect(response.userId).to.equal(payloadUpdate.userId);
            expect(response).to.have.property('startDate');
            expect(response).to.have.property('endDate');
            expect(response).to.have.property('list').to.have.lengthOf.at.least(1);
            expect(response).to.have.property('status').to.equal('pending');
            expect(response).to.have.property('createdAt');
        });

        it('Validation Error', async () => {
            payloadUpdate.list = [];
            try {
                await Validator.validateSchema(payload, BookingModel.PUT);
            } catch (error) {
                expect(validatorStub.calledOnce).to.be.true;
                expect(findBookingStub.calledOnce).to.be.false;
                expect(isBookingExistStub.calledOnce).to.be.false;
                expect(saveStub.calledOnce).to.be.false;
                
                expect(error.status).to.equal(false);
                expect(error.errors).to.have.lengthOf.at.least(1);
                expect(error.statusCode).to.equal(400);
                expect(error.message).to.equal('Validation Error!');
            }
        });

        it('Invalid Book request, max book borrowed error', async () => {
            payloadUpdate.list = [
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
            ];
            payloadUpdate.startDate = now.set('date', now.get('date') + 1).format(formatDay);
            payloadUpdate.endDate = now.set('date', now.get('date') + 10).format(formatDay);
            try {
                await BookingService.updateBooking(bookingId, payloadUpdate)
            } catch (error) {
                expect(validatorStub.calledOnce).to.be.true;
                expect(findBookingStub.calledOnce).to.be.false;
                expect(isBookingExistStub.calledOnce).to.be.false;
                expect(saveStub.calledOnce).to.be.false;
        
                expect(error.status).to.equal(false);
                expect(error.errors).to.equal(null);
                expect(error.statusCode).to.equal(400);
                expect(error.message).to.equal(`You can only borrow maximal for ${MAX_DAYS_BOOKING} days`);
            }
        });
        
        it('Validation Error Max Item List', async () => {
            payloadUpdate.list = [
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
                {
                    bookKey: '/works/xx',
                    bookTitle: 'The test',
                },
            ];
            payloadUpdate.startDate = now.set('date', now.get('date') + 1).format(formatDay);
            payloadUpdate.endDate = now.set('date', now.get('date') + 2).format(formatDay);
            try {
                await BookingService.updateBooking(bookingId, payloadUpdate)
            } catch (error) {
                expect(validatorStub.calledOnce).to.be.true;
                expect(error.status).to.equal(false);
                expect(error.errors).to.equal(null);
                expect(error.statusCode).to.equal(400);
                expect(error.message).to.equal(`You can only borrow maximal ${MAX_BOOKS_BORROWED} books`);
            }
        });
    });

    let payloadPatch = { status: "approved"}
    describe('Patch Booking', function () {

        it('Success Approved', async () => {

            getByIdStub.returns(mockBooking[0]);
            updateStub.returns(payloadPatch);
            response = await BookingService.updateStatusBooking(bookingId, payloadPatch);
                
            expect(validatorStub.calledOnce).to.be.true;
            expect(getByIdStub.calledOnce).to.be.true;
            expect(updateStub.calledOnce).to.be.true;

            expect(response).to.have.property('status').to.equal(payloadPatch.status);
        });

        it('Success Done', async () => {
            payloadPatch.status = 'done'
            getByIdStub.returns(mockBooking[0]);
            updateStub.returns(payloadPatch);
            response = await BookingService.updateStatusBooking(bookingId, payloadPatch);
                
            expect(validatorStub.calledOnce).to.be.true;
            expect(getByIdStub.calledOnce).to.be.true;
            expect(updateStub.calledOnce).to.be.true;

            expect(response).to.have.property('status').to.equal(payloadPatch.status);
        });
        it('Success Cancelled', async () => {
            payloadPatch.status = 'done'
            payloadPatch.reason = 'ya gitu'
            getByIdStub.returns(mockBooking[0]);
            updateStub.returns(payloadPatch);
            response = await BookingService.updateStatusBooking(bookingId, payloadPatch);
                
            expect(validatorStub.calledOnce).to.be.true;
            expect(getByIdStub.calledOnce).to.be.true;
            expect(updateStub.calledOnce).to.be.true;

            expect(response).to.have.property('status').to.equal(payloadPatch.status);
            expect(response).to.have.property('reason').to.equal(payloadPatch.reason);
        });

        it('Success Rejected', async () => {
            payloadPatch.status = 'done'
            payloadPatch.reason = 'ya gitu'
            getByIdStub.returns(mockBooking[0]);
            updateStub.returns(payloadPatch);
            response = await BookingService.updateStatusBooking(bookingId, payloadPatch);
                
            expect(validatorStub.calledOnce).to.be.true;
            expect(getByIdStub.calledOnce).to.be.true;
            expect(updateStub.calledOnce).to.be.true;

            expect(response).to.have.property('status').to.equal(payloadPatch.status);
            expect(response).to.have.property('reason').to.equal(payloadPatch.reason);
        });

        it('Validation Error', async () => {
            payloadPatch.status = ''
            try {
                await Validator.validateSchema(payload, BookingModel.PATCH);
            } catch (error) {
                
                expect(validatorStub.calledOnce).to.be.true;
                expect(getByIdStub.calledOnce).to.be.false;
                expect(updateStub.calledOnce).to.be.false;

                expect(error.status).to.equal(false);
                expect(error.errors).to.be.an('array');
                expect(error.errors).to.have.lengthOf.at.least(1);
                expect(error.statusCode).to.equal(400);
                expect(error.message).to.equal('Validation Error!');
            }
        });
    });

    describe('Delete Booking', function () {

        it('Success', async () => {
            deleteStub.returns({value : mockBooking[0]});

            response = await BookingService.deleteBooking(mockBooking[0]._id);
            expect(deleteStub.calledOnce).to.be.true;
        });

        it('Validation error', async () => {
            bookingId = '638c8691b1a20b1247f0ede1';
            deleteStub.returns({value : null});
            try {
               await BookingService.deleteBooking(bookingId);
            } catch (error) {
                console.log(error);
                expect(error.status).to.equal(false);
                expect(error.errors).to.equal(null);
                expect(error.statusCode).to.equal(400);
                expect(error.message).to.equal('Booking Id is not found or book(s) still borrowed!');
            }

        });
        it('Not found', async () => {
            bookingId = ''
            try {
               await BookingService.getBooking(bookingId);
               await BookingService.deleteBooking(bookingId);
            } catch (error) {
                expect(getByIdStub.calledOnce).to.be.true;
    
                expect(error.status).to.equal(false);
                expect(error.errors).to.equal(null);
                expect(error.statusCode).to.equal(404);
                expect(error.message).to.equal('Booking Id is not found!');
            }
        });

    });
});
