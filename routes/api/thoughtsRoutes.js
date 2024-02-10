const router = require('express').Router();

const {
  getAllThoughts,
  getOneThought,
  newThought,
} = require('../../controller/thoughtsController');

router.route('/').get(getAllThoughts).post(newThought);
router.route('/:id').get(getOneThought);

module.exports = router;
