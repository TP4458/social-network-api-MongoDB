const { Users } = require('../models');

const userControllers = {
  //GET all users:
  getAllUsers(req, res) {
    Users.find({})
      .populate({ path: 'thoughts', select: '__v:0' })
      .populate({ path: 'friends', select: '__v:0' })
      .select('-__v')
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getOneUser(req, res) {
    Users.findOne({ _id: req.params.id })
      .populate({ path: 'thoughts', select: '__v:0' })
      .populate({ path: 'friends', select: '__v:0' })
      .select('-__v')
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this ID' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
}; //END BRACKET

module.exports = userControllers;
