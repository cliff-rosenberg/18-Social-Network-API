// load Express router module
const router = require('express').Router();

// load functions from 'thought-controller.js'
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

//* route is /api/thoughts
router.route('/').get(getThoughts).post(createThought);

//* route is /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

//* route is /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

//* route is /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
