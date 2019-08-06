const gmailAuth = require('./../../utils/gmailAuth');

const models = require('./../index');
const user = require('./../user/user.model');
const Account = models.Account;


const syncService = () => {
  return user.getMany({})
  .then((users) => {
    const account = users[0]['accounts'][0];
    const token = {
      access_token: account.access_token,
      scope: account.scope,
      token_type: account.token_type,
      expiry_date: account.expiry_date
    };
    gmailAuth.authorize(token, (auth) => {
      gmailAuth.listLabels(auth)
    })
    return token;
  })
}

module.exports = {
  syncService: syncService
}