const express = require('express');
const App = express();

const { OpenLibraryController } = require('../../../modules/controllers');

App.get('/', OpenLibraryController.getListBySubject);
App.get('/detail', OpenLibraryController.getDetailBySubject);

module.exports = App;
