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
      match: [/.+@.+\..+/, 'Must match an email address!'],
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
      virtuals: true,
      getters: true,
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

// is this what is for the bonus?
// see Mongoose docs at https://mongoosejs.com/docs/middleware.html#pre
userSchema.pre("findOneAndDelete", { document: false, query: true }, async () => {
  console.log("this is a pre-delete for User...");
  const results = await this.model.findOne(this.getFilter());
  console.log("results here: ", results.username);
  await Thought.deleteMany({ username: results.username });
});

const User = model('User', userSchema);

module.exports = User;
