const router = require('express').Router();

const {
  getAllThoughts,
  getOneThought,
} = require('../../controller/thoughtsController');

router.route('/').get(getAllThoughts);
router.route('/:id').get(getOneThought);

module.exports = router;
