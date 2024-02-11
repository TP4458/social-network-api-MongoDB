const router = require('express').Router();

const {
  getAllThoughts,
  getOneThought,
  newThought,
  updateThought,
  deleteThought,
  newReaction,
  deleteReaction,
} = require('../../controller/thoughtsController');

router.route('/').get(getAllThoughts);

router.route(':/userId').post(newThought);

router
  .route('/:id')
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

router.route(':/thoughtId/reactions').post(newReaction);
router.route(':/thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
