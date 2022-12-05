const Validator = require('../../../helpers/validateSchema');
const { OpenLibraryModel } = require('../../models');
const { NotFoundError } = require('../../../helpers/exceptions');
const Request = require('../../../libraries/request');

const OPEN_LIBRARY_URL = process.env.OPEN_LIBRARY_URL;
const OPEN_LIBRARY_LIMIT = process.env.OPEN_LIBRARY_LIMIT;
const FIELDS_SUBJECT = ['key', 'title', 'authors', 'edition_count', 'cover_id'];
const FIELDS_DETAIL = [
    'key',
    'title',
    'authors',
    'description',
    'first_sentence',
    'first_publish_date',
    'links',
    'revision',
];

const Services = {
    getListBySubject: async (payload) => {
        try {
            let query = await Validator.validateSchema(payload, OpenLibraryModel.GET_SUBJECT);
            query.limit = undefined !== typeof payload.limit ? payload.limit : OPEN_LIBRARY_LIMIT;

            const uri = `/subjects/${query.search.replace(/ /g, '_').toLowerCase()}.json`;
            const books = await Request.get(OPEN_LIBRARY_URL + uri, query);
            if (books && books.works.length === 0) {
                throw new NotFoundError('No book(s) found!');
            }
            return filterSubjectResult(books.works);
        } catch (error) {
            throw error;
        }
    },
    getDetailBySubject: async (payload) => {
        try {
            await Validator.validateSchema(payload, OpenLibraryModel.GET_DETAIL);

            const uri = `${payload.key}.json`;

            const details = await Request.get(OPEN_LIBRARY_URL + uri, payload);
            if (!details) {
                throw new NotFoundError('No book(s) found!');
            }
            
            return filterDetailResult(details);
        } catch (error) {
            throw error;
        }
    },
};

module.exports = Services;

const filterSubjectResult = (books) => {
    const results = books.map((book) => {
        const newBook = {};
        FIELDS_SUBJECT.forEach((field) => (newBook[field] = book[field]));
        return newBook;
    });
    return results ;
};

const filterDetailResult = (book) => {
    const newBook = {};

    FIELDS_DETAIL.forEach((field) => (newBook[field] = book[field]));

    return newBook;
};
