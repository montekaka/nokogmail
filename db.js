const mongoose = require('mongoose');
const userSchema = require('./resources/user/user.schema');

const connect = () => {
  mongoose.connect('mongodb://localhost:27017/nokogmailDB', {useNewUrlParser: true});
  // const user = new mongoose.Schema(userSchema);
  // const User = mongoose.model("User", user);
  return;
}

module.exports = connect;