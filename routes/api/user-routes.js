// loads Express router module
const router = require('express').Router();

// load all functions from 'user-controller.js'
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');

// route prefix is /api/users
router.route('/').get(getUsers).post(createUser);

// route prefix is /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// route prefix is /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
