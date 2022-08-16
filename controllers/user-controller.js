//*
//* Controller for User
//*

// import the required Models
const { User, Thought } = require('../models');

// define the controller functions for the User routes
const userController = {
  // get all users
  // API GET route is 'api/users'
  getUsers(req, res) {
    // Mongoose 'find()' query to return all documents
    // the Mongoose 'select()' method is used to specify the field(s) to be returned in the query result
    // in this case it hides the Version Key from queries
    User.find()
      .select('-__v')
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        // returns a "500 Internal Server Error"
        res.status(500).json(err);
      });
  },
  // get single user by id
  // API GET route is '/api/users/:userId'
  getSingleUser(req, res) {
    // Mongoose helper action format is 'findOne(conditions)', finds one matching document
    // the Mongoose 'select()' method is used to specify the field(s) to be returned in the query result
    // in this case it hides the Version Key from queries
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((dbUserData) => {
        // throws a "404 Not Found" if no user id match
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        } else {
          res.json(dbUserData);
        };
      })
      .catch((err) => {
        console.log(err);
        // returns a "500 Internal Server Error"
        res.status(500).json(err);
      });
  },
  // create a new user
  // API POST route is 'api/users'
  createUser(req, res) {
    // Mongoose helper action format is 'create(document)', shortcut for saving one or more documents to the database
    User.create(req.body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        // returns a "500 Internal Server Error"
        res.status(500).json(err);
      });
  },
  // update a user
  // API PUT route is '/api/users/:userId'
  updateUser(req, res) {
    // Mongoose helper action format is 'findOneAndUpdate(conditions, update, options)'
    User.findOneAndUpdate(
      { _id: req.params.userId },
      // MongoDB: The '$set' operator replaces the value of a field with the specified value
      { $set: req.body, },
      // for runValidators option see https://mongoosejs.com/docs/validation.html#update-validators
      // in this case it is a validation of new object against schema
      // To return the document with modifications made on the update, use the 'new: true' option
      { runValidators: true, new: true }
    )
      .then((dbUserData) => {
        // throws a "404 Not Found" if no user id match
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        } else {
          res.json(dbUserData);
        };
      })
      .catch((err) => {
        console.log(err);
        // returns a "500 Internal Server Error"
        res.status(500).json(err);
      });
  },
  // delete user
  // API DELETE route is '/api/users/:userId'
  deleteUser(req, res) {
    // Mongoose helper action format is 'findOneAndDelete(conditions)'
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => {
        // throws a "404 Not Found" if no user id match
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
      })
      .then(() => {
        res.json({ message: 'User deleted!' });
      })
      .catch((err) => {
        console.log(err);
        // returns a "500 Internal Server Error"
        res.status(500).json(err);
      });
  },
  // add friend to friend list
  // API POST route is '/api/users/:userId/friends/:friendId'
  addFriend(req, res) {
    // Mongoose helper action format is 'findOneAndUpdate(conditions, update, options)'
    User.findOneAndUpdate(
      { _id: req.params.userId },
      // MongoDB: The '$addToSet' operator adds a value to an array unless the value is already present
      { $addToSet: { friends: req.params.friendId } },
      // To return the document with modifications made on the update, use the 'new: true' option
      { new: true }
      )
      .then((dbUserData) => {
        // throws a "404 Not Found" if no user id match
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        } else {
          res.json(dbUserData);
        };
      })
      .catch((err) => {
        console.log(err);
        // returns a "500 Internal Server Error"
        res.status(500).json(err);
      });
  },
  // remove friend from friend list
  // API DELETE route is '/api/users/:userId/friends/:friendId'
  removeFriend(req, res) {
    // Mongoose helper action format is 'findOneAndUpdate(conditions, update, options)'
    User.findOneAndUpdate(
      { _id: req.params.userId },
      // MongoDB: The '$pull' operator removes from an existing array all instances of a value
      // or values that match a specified condition.
      { $pull: { friends: req.params.friendId } },
      // To return the document with modifications made on the update, use the 'new: true' option
      { new: true }
      )
      .then((dbUserData) => {
        // throws a "404 Not Found" if no user id match
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        } else {
          res.json(dbUserData);
        };
      })
      .catch((err) => {
        console.log(err);
        // returns a "500 Internal Server Error"
        res.status(500).json(err);
      });
  },
};// end controller

// export all functions for use in user-routes
module.exports = userController;
