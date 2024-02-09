const router = require('express').Router();

const { getAllUsers, getOneUser } = require('../../controller/userController');

router.route('/').get(getAllUsers);

router.route('/:id').get(getOneUser);

module.exports = router;
