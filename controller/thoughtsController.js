const { Thoughts, Users } = require('../models');

const thoughtsControllers = {
  //get all thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then((dbThoughtsData) => res.json(dbThoughtsData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //get one thought by ID

  getOneThought({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'no thought found with this ID' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //create new thought
  newThought({ params, body }, res) {
    Thoughts.create(body)
      //update user with his thought
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'no thought found with this ID' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .populate({ path: 'reactions', select: '-__v' })
      .select('-___v')
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'no thought found with this ID' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  deleteThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'no thought found with this ID' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.status(400).json(err));
  },

  newReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      //which thought is the reaction for?
      { _id: params.thoughtId },
      //add reaction body
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'no thought found with this ID' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a reaction by ID
  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'no thought found with this ID' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtsControllers;
