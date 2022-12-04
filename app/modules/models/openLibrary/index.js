const fs = require('fs');

module.exports = {
    GET_SUBJECT: JSON.parse(fs.readFileSync(__dirname + '/getSubject.json')),
    GET_DETAIL: JSON.parse(fs.readFileSync(__dirname + '/getDetail.json')),
};
