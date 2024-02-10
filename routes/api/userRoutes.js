const router = require('express').Router();

const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
} = require('../../controller/userController');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getOneUser).put(updateUser);

module.exports = router;
