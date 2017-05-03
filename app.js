const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const config = require('./src/config');
console.log(`Application running in ${config.NODE_ENV} mode.`)

const {mongoose} = require('./db/mongoose');
let db = mongoose.connection;
db.on('error', function() {
  console.error.bind(console, 'connection error:')
});

db.once('open', function() {
    console.log(`Connected to mongo at ${config.MONGODB_URI}`);
});

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'docs')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  res.status(err.status || 500);
});

module.exports = app;
