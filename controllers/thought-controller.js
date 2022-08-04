//*
//* Controller for Thoughts
//*

// import the required Models
const { Thought, User } = require('../models');

// define the controller functions for the Thoughts routes
const thoughtController = {
  // GET for all thoughts
  // API GET route is '/api/thoughts'
  getThoughts(req, res) {
    // Mongoose 'find()' query to return all documents
    // The Mongoose 'sort()' method sets the sort order
    // If an { object } is passed, values allowed are asc, desc, ascending, descending, 1, and -1
    Thought.find()
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        // returns a "500 Internal Server Error"
        res.status(500).json(err);
      });
  },
  // GET for single thought by id
  // API GET route is '/api/thoughts/:thoughtId'
  getSingleThought(req, res) {
    // Mongoose helper action format is 'findOne(conditions)', finds one matching document
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        // throws a "404 Not Found" if no id match
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        // returns a "500 Internal Server Error"
        res.status(500).json(err);
      });
  },
  // create a thought
  // API POST route is '/api/thoughts'
  createThought(req, res) {
    // Mongoose helper action format is 'create(document)', shortcut for saving one or more documents to the database
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          // MongoDB The '$push' operator appends a specified value to an array
          { $push: { thoughts: dbThoughtData._id } },
          // To return the document with modifications made on the update, use the 'new: true' option
          { new: true }
        );
      })
      .then((dbUserData) => {
        // throws a "404 Not Found" if no User id match
        if (!dbUserData) {
          return res.status(404).json({ message: 'Thought created but no user with this id!' });
        }

        res.json({ message: 'Thought successfully created!' });
      })
      .catch((err) => {
        console.log(err);
        // returns a "500 Internal Server Error"
        res.status(500).json(err);
      });
  },
  // update thought by id
  // API PUT route is '/api/thoughts/:thoughtId'
  updateThought(req, res) {
    // Mongoose helper action format is 'findOneAndUpdate(conditions, update, options)'
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      { $set: req.body },
      // for runValidators option see https://mongoosejs.com/docs/validation.html#update-validators
      // To return the document with modifications made on the update, use the 'new: true' option
      { runValidators: true, new: true })
      .then((dbThoughtData) => {
        // throws a "404 Not Found" if no Thought id match
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        // returns a "500 Internal Server Error"
        res.status(500).json(err);
      });
  },
  // DELETE thought by id
  // API route is '/api/thoughts/:thoughtId'
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
         // throws a "404 Not Found" if no Thought id match
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        //* remove thought id from user's `thoughts` field, is this right?
        // Mongoose helper action format is 'findOneAndUpdate(conditions, update, options)'
        return User.findOneAndUpdate(
          //{ thoughts: req.params.thoughtId },
          { username: deletedThought.username },
          // MongoDB The '$pull' operator removes from an existing array all instances of a value
          // or values that match a specified condition
          { $pull: { thoughts: req.params.thoughtId } },
          // To return the document with modifications made on the update, use the 'new: true' option
          { new: true }
        );
      })
      .then((dbUserData) => {
        // throws a "404 Not Found" if no user id match
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json({ message: 'Thought successfully deleted!' });
      })
      .catch((err) => {
        console.log(err);
        // returns a "500 Internal Server Error"
        res.status(500).json(err);
      });
  },
  // add a reaction to a specified Thought id
  // API POST route is '/api/thoughts/:thoughtId/reactions'
  addReaction(req, res) {
    // Mongoose helper action format is 'findOneAndUpdate(conditions, update, options)'
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      // MongoDB: '$addToSet' returns an array of all unique values that results from applying an expression to each document in a group.
      { $addToSet: { reactions: req.body } },
      // for runValidators option see https://mongoosejs.com/docs/validation.html#update-validators
      // To return the document with modifications made on the update, use the 'new: true' option
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        // throws a "404 Not Found" if no Thought id match
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        // returns a "500 Internal Server Error"
        res.status(500).json(err);
      });
  },
  // delete Reaction (by id) from a Thought
  // API DELETE route is '/api/thoughts/:thoughtId/reactions/:reactionId'
  removeReaction(req, res) {
    // Mongoose helper action format is 'findOneAndUpdate(conditions, update, options)'
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      // this will remove specific reply from the array
      // where Reaction id matches value of 'params.reactionId'
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      // for runValidators see https://mongoosejs.com/docs/validation.html#update-validators
      // To return the document with modifications made on the update, use the 'new: true' option
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        // throws a "404 Not Found" if no Thought id match
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        // returns a "500 Internal Server Error"
        res.status(500).json(err);
      });
  },
};// end controller

// export all functions for use in thought-routes
module.exports = thoughtController;
