const App = require('./app');

const port = process.env.PORT || 3000;

App.listen(port);
console.info('[APP] API-BOOK STARTED on ' + port);
