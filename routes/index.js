const express = require('express');
const router = express.Router();
const indexController = require('../controller/index');
const userController = require('../controller/user');
/* GET home page. */

router.get('/', indexController.index);
router.post('/', userController.logout);

router.route('/signup')
  .get(indexController.signup)
  .post(userController.signup)

router.route('/login')
  .get(indexController.login)
  .post(userController.login)

module.exports = router;
