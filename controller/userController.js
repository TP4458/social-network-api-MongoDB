const { Users } = require('../models');

const userControllers = {
  //GET all users:
  getAllUsers(req, res) {
    Users.find({})
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
}; //END BRACKET

module.exports = userControllers;
