const models = require('./../index');

const User = models.User;
const Account = models.Account;

const create = (params) => {
  const user = new User(params);
  return user.save();
}

const getMany = (params) => {
  // if params is empty {}, then return everything
  const query = User.find(params).select('-password'); // excludes the password field
  return query.exec();
}

const get = (params) => {
  return User.findOne(params).exec()
}

const addAccount = (id, accountData) => {
  // TODO get auth token from gmail
  const account = new Account(accountData);  
  account.save();
  return User.findByIdAndUpdate(id, {
    "$push": {"accounts": account}
  }).exec();
}

const update = (id, params) => {
  const query = User.findByIdAndUpdate(id, params, {new: true});
  return query.exec();
}

const remove = (id) => {
  const query = User.findByIdAndRemove(id);
  return query.exec();
}

module.exports = {
  create: create,
  get: get,
  getMany: getMany,
  update: update,
  remove: remove,
  addAccount: addAccount
}