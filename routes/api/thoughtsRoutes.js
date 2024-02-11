const router = require('express').Router();

const {
  getAllThoughts,
  getOneThought,
  newThought,
  updateThought,
} = require('../../controller/thoughtsController');

router.route('/').get(getAllThoughts).post(newThought);
router.route('/:id').get(getOneThought).put(updateThought);

module.exports = router;
