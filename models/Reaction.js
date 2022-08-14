const { Schema, Types } = require('mongoose');
// load helper for date formatting
const dateFormat = require('../utils/dateFormat');

// Mongoose Note: "An ObjectId is a special type typically used for unique identifiers."
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

// NOTE about Getters/Setters in Mongoose schemas-
// "Mongoose 'getters' and 'setters' allow you to execute custom logic when getting or setting a property on a Mongoose document."
// "Getters let you transform data in MongoDB into a more user friendly form"
// "Setters let you transform user data before it gets to MongoDB"

module.exports = reactionSchema;
