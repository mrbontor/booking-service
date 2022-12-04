const { OpenLibraryService } = require('../../services');
const ResponseHelper = require('../../../helpers/response');

module.exports = {
    getListBySubject: async (req, res) => {
        try {
            const data = await OpenLibraryService.getListBySubject(req.query);

            ResponseHelper.success(res, data);
        } catch (err) {
            console.error(`[LIST][BOOK][SUBJECT] >>>>> ${JSON.stringify(err.stack)}`);
            ResponseHelper.error(res, err);
        }
    },

    getDetailBySubject: async (req, res) => {
        try {
            const data = await OpenLibraryService.getDetailBySubject(req.query);

            ResponseHelper.success(res, data);
        } catch (err) {
            console.error(`[LIST][BOOK][SUBJECT] >>>>> ${JSON.stringify(err.message)}`);
            ResponseHelper.error(res, err);
        }
    },
};
