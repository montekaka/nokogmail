const mongoose = require('mongoose');
const userSchema = require('./user/user.schema');

mongoose.connect('mongodb://localhost:27017/nokogmailDB', {useNewUrlParser: true});

const User = mongoose.model('User', userSchema);

module.exports = {
  User: User
};
