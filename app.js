const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rateLimit = require("express-rate-limit");

const usersRouter = require('./routes/users');
const messageRouter = require('./routes/messages');

const app = express();
require('./config/db');
const utils = require('./utils/utils');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.use('/api/v1/*', function (req, res, next) {
  var freeAuthPath = [
    '/api/v1/users/register',
    '/api/v1/users/login'
  ];
  var available = false;
  for (var i = 0; i < freeAuthPath.length; i++) {
    if (freeAuthPath[i] == req.baseUrl) {
      available = true;
      break;
    }
  }
  if (!available) {
    utils.ensureAuthorized(req, res, next);
  } else {
    next();
  }
});

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/message', messageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
