const mongoose = require('mongoose');

const config = require('../src/config');

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI);

module.exports = { mongoose };