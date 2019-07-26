const mongoose = require('mongoose');
const userSchema = require('./resources/user/user.schema');
const config = require('./config/index');

const connect = () => {
  mongoose.connect(config.dbUrl, {useNewUrlParser: true});
  // const user = new mongoose.Schema(userSchema);
  // const User = mongoose.model("User", user);
  return;
}

module.exports = connect;