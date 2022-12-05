const HttpRequest = require('./httpRequest');

/**
 * @param {string} method
 * @param {string} url
 * @param {object} [reqData={}]
 * @param {object} [options={}]
 * @return Promise<object>
 */
const request = async (method, url, reqData = {}, options = {}) => {
    try {
        console.debug(`[HTTP REQUEST]${method.toUpperCase()} URL >>>> ${url}`);
        const { data } = await HttpRequest.httpRequest(method, url, reqData, options);
        return data;
    } catch (error) {
        // console.error(`[HTTP REQUEST]${method.toUpperCase()} ERROR >>>> ${JSON.stringify(e.stack)}`)
        console.error(`[HTTP REQUEST]${method.toUpperCase()} URL >>>> ${url}`);
        console.error(
            `[HTTP REQUEST][ERROR]${method.toUpperCase()} STATUSCODE >>>> ${JSON.stringify(error.response.statusText)}`,
        );
        console.error(
            `[HTTP REQUEST][ERROR]${method.toUpperCase()} RESULT >>>> ${JSON.stringify(error.response.data)}`,
        );

        const errResponse = {
            message: error.message || error.response.message || 'ErrorRequest',
            statusCode: error.response ? error.response.status : error.response.statusText,
            status: false
        };
        throw errResponse;
    }
};

module.exports = {
    /**
     * @param {string} url
     * @param {string} data
     * @param {string} [options]
     * @return Object
     */
    post: (url, data, options) => {
        return request('post', url, data, options);
    },

    /**
     * @param {string} url
     * @param {string} params
     * @param {string} [options]
     * @return Object
     */
    get: (url, params, options) => {
        return request('get', url, params, options);
    },

    /**
     * @param {string} url
     * @param {string} params
     * @param {string} [options]
     * @return Object
     */
    delete: (url, params, options) => {
        return request('delete', url, params, options);
    },

    /**
     * @param {string} url
     * @param {string} data
     * @param {string} [options]
     * @return Object
     */
    put: (url, data, options) => {
        return request('put', url, data, options);
    },

    /**
     * @param {string} url
     * @param {string} data
     * @param {string} [options]
     * @return Object
     */
    patch: (url, data, options) => {
        return request('patch', url, data, options);
    },
};
