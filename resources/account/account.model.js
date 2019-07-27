const models = require('./../index');

const Account = models.Account;

const create = (params) => {
  const account = new Account(params);
  return account.save();  
}

module.exports = {
  create: create
}