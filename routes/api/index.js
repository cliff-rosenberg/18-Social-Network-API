// loads Express router
const router = require('express').Router();

// loads required Routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// set up Express router to use Routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
