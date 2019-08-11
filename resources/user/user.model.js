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
  const query = User.findOne({"_id": id, "accounts.email": accountData['email']});
  return query.exec()
  .then((user) => {
    if(user) {      
      let account = user.accounts[0];
      account.access_token = accountData['access_token'];
      account.scope = accountData['scope'];
      account.token_type = accountData['token_type'];
      account.expiry_date = accountData['expiry_date'];
      return user.save();
    } else {
      const newAccount = new Account(accountData);
      newAccount.save();
      return User.findByIdAndUpdate(id, {
        "$push": {"accounts": newAccount}
      }).exec(); 
    }    
  });
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