const { Schema, model } = require('mongoose');

// Mongoose Note: "An ObjectId is a special type typically used for unique identifiers."
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // simple RegEx to validate an email in Mongoose
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,3})$/, 'Must match an email address!'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      // needed due to there being a virtual property in this schema
      virtuals: true,
    },
    id: false,
  }
);

// NOTE about 'virtuals' in Mongoose-
// Virtuals are document properties that you can get and set but that do not get persisted to MongoDB. 
// The getters are useful for formatting or combining fields,
// while setters are useful for de-composing a single value into multiple values for storage.
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
