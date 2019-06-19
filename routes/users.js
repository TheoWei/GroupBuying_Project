const express = require('express');
const router = express.Router();

const usercontroller = require('../controller/user');


router.route('/:user_id')
  .get(usercontroller.getUser)
  .put(usercontroller.update)



module.exports = router;
