const Router = require('express').Router;
const Controllers = require('./account.controllers');

const router = Router();

router.route('/').get(Controllers.syncAll);

module.exports = router;