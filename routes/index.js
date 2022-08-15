// The express.Router class creates modular, mountable route handlers
// A Router instance is a complete middleware and routing system;
// for this reason, it is often referred to as a “mini-app”
// see https://expressjs.com/en/guide/routing.html for more info
const router = require('express').Router();
// set up routes here
const apiRoutes = require('./api');

// the "API Routes" need the prefix of "/api" to work
router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;
