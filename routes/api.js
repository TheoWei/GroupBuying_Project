const express = require('express');
const router = express.Router();

const communityController = require('../controller/community');
const typeController = require('../controller/community_type');
const groupController = require('../controller/group');

router.route('/community/')
  .get(communityController.getAll)
  .post(communityController.create)
router.route('/community/:community_id')
  .get(communityController.getOne)
  .put(communityController.update)
  .delete(communityController.delete);

router.route('/types/')
  .get(typeController.getAll)
  .post(typeController.create);
router.route('/types/:type_id')
  .put(typeController.update)
  .delete(typeController.delete);

router.route('/groups')
  .get(groupController.getAll);
router.route('/groups/:group_id')
  .get(groupController.getOne)
  .post(groupController.create)
  .put(groupController.update)
  .delete(groupController.delete)
  .delete(groupController.deleteAttendee);

module.exports = router;
