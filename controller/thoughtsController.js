const { Thoughts } = require('../models');

const thoughtsControllers = {
  //get all thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .populate({ path: reactions, select: '__v:0' })
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
      .populate({ path: reactions, select: '__v:0' })
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
}; //end bracket

module.exports = thoughtsControllers;
