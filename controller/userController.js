const { Users } = require('../models');

const userControllers = {
  //GET all users:
  getAllUsers(req, res) {
    Users.find({})
      //.populate to get entire collection back
      .populate({ path: 'thoughts', select: '__v:0' })
      .populate({ path: 'friends', select: '__v:0' })
      .select('-__v')
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getOneUser({ params }, res) {
    Users.findOne({ _id: params.id })
      //.populate to get entire collection back
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

  createUser({ body }, res) {
    Users.create(body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.status(400).json(err));
  },

  updateUser({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this ID' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  deleteUser({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this ID' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  addFriend({ params }, res) {
    Users.findByIdAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .populate({ path: 'friends', select: '__v:0' })
      .select('-__v')
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this ID' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  deleteFriend({ params }, res) {
    Users.findByIdAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No User with this particular ID!' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },
}; //END BRACKET

module.exports = userControllers;
