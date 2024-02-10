const router = require('express').Router();

const {
  getAllUsers,
  getOneUser,
  createUser,
} = require('../../controller/userController');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getOneUser);

module.exports = router;
