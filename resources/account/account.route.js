const Router = require('express').Router;
const Controllers = require('./account.controllers');

const router = Router();

router.route('/').post(Controllers.create);