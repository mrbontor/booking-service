const fs = require('fs');

module.exports = {
    POST: JSON.parse(fs.readFileSync(__dirname + '/post.json')),
    PUT: JSON.parse(fs.readFileSync(__dirname + '/put.json')),
    PATCH: JSON.parse(fs.readFileSync(__dirname + '/patchPassword.json')),
    PATCH_LOGIN_STATUS: JSON.parse(fs.readFileSync(__dirname + '/patchStatus.json')),
};
