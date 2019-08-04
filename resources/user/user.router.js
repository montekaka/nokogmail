const Router = require('express').Router;
const Controllers = require('./user.controllers');

const router = Router();

router.route('/').get(Controllers.getAll);
router.route('/').post(Controllers.create);
router.route('/:id/account').post(Controllers.addAccount);
// router.route('/').post(Controllers.create);
router.route('/:id').put(Controllers.update)
router.route('/:id').delete(Controllers.remove)

module.exports = router;