//* Set up connection parameters
// load the 'mongoose' ODM module
const mongoose = require('mongoose');

// set up the database connection
//* connection options:
// The 'useNewUrlParser' flag to allow users to fall back to the old parser if they find a bug in the new parser. 
// You should set useNewUrlParser: true unless that prevents you from connecting.
// Note that if you specify 'useNewUrlParser: true', you must specify a port in your connection string
// The 'useUnifiedTopology' flag is set to 'false' by default. 
// Set to 'true' in options to use the MongoDB driver's new connection management engine.
// You should set this option to 'true', except for the unlikely case that it prevents you from maintaining a stable connection.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialmedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;
