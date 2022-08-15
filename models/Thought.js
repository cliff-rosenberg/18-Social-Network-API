const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
// load helper for date formatting
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      // virtuals is true - there is a virtual property in this schema
      virtuals: true,
    },
    id: false
  }
);

// NOTE about Getters/Setters in Mongoose schemas-
// "Mongoose 'getters' and 'setters' allow you to execute custom logic when getting or setting a property on a Mongoose document."
// "Getters let you transform data in MongoDB into a more user friendly form"
// "Setters let you transform user data before it gets to MongoDB"

// NOTE about 'virtuals' in Mongoose-
// Virtuals are document properties that you can get and set but that do not get persisted to MongoDB. 
// The getters are useful for formatting or combining fields,
// while setters are useful for de-composing a single value into multiple values for storage.
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
