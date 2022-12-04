const { Router } = require('express');
const App = new Router();

const BodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// setup CORS
const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-access-token, Authorization, tdid',
    );
    res.header('Access-Control-Allow-Methods', 'POST, GET,PUT, OPTIONS, DELETE, PATCH');
    // next()
    if (req.method == 'OPTIONS') {
        res.sendStatus();
    } else {
        next();
    }
};

//enable CORS
App.use(allowCrossDomain);

App.use(BodyParser.json());
App.use(cookieParser());
App.use(BodyParser.urlencoded({ extended: false }));

// Handle server error
App.use((err, req, res, next) => {
    console.debug(`[REQ] ${req.body}`);

    let response = {
        status: false,
        message: err.message,
    };
    try {
        JSON.parse(req.body);
    } catch (e) {
        console.error('[MIDDLEWAREERROR] ' + err.message);
        response.message = e.message;
        res.status(400).send(response);
    }

    if (err) {
        console.error('[MIDDLEWAREERROR] ' + err.message);
        res.status(500).send(response);
    }

    next();
});

module.exports = App;
