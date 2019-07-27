const config = require('./../config/index');
const mongoose = require('mongoose');
const userSchema = require('./user/user.schema');
const accountSchema = require('./account/account.schema');

mongoose.connect(config.dbUrl, {useNewUrlParser: true});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
  User: User,
  Account: Account
};
