const config = require('./../config/index');
const mongoose = require('mongoose');
const userSchema = require('./user/user.schema');

mongoose.connect(config.dbUrl, {useNewUrlParser: true});

const User = mongoose.model('User', userSchema);

module.exports = {
  User: User
};
