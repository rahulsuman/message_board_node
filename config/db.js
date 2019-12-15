(function () {
    'use strict';
}());
const mongoose = require('mongoose');
require('../models/users');
require('../models/messages');

mongoose.connect('mongodb://localhost:27017/messageboard', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Database connected successfully.", process.env.PORT);
});