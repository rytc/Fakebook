const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fakebook_db');

module.exports = mongoose.connection;