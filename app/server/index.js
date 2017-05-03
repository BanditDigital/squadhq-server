require('dotenv').config({silent:true});

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const config = require('../config');
console.log(`Application running in ${config.NODE_ENV} mode.`)

const {mongoose} = require('../db');
let db = mongoose.connection;
db.on('error', function() {
    console.error.bind(console, 'connection error:')
});

db.once('open', function() {
    console.log(`Connected to mongo at ${config.MONGODB_URI}`);
});

const userRoutes =  require('../user/user');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../docs')));

app.use('/user', userRoutes);

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

app.listen(config.PORT, function () {
    console.log('Server running on port %d', config.PORT);
});

module.exports = {app};
