const account = require('./account.model');

// sync all
const syncAll = (req, res) => {
  account.syncService()
  .then((collection) => {
    res.status(202).json({data: collection});
  })
  .catch((err) => {
    res.status(404).json({error_message: err});
  })
}

module.exports = {
  syncAll: syncAll
}