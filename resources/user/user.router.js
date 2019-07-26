const Router = require('express').Router;
const Controllers = require('./user.controllers');

const router = Router();

router.route('/').get(Controllers.getAll);
router.route('/').post(Controllers.create);

module.exports = router;