const { Schema, model } = require('mongoose');

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
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// is this what is for the bonus?
// see Mongoose docs at https://mongoosejs.com/docs/middleware.html#pre
userSchema.pre("findOneAndDelete", { document: false, query: true }, async () => {
  console.log("this pre-delete for User...");
  const results = await this.model.findOne(this.getFilter());
  console.log("results ", results.username);
  await Thought.deleteMany({ username: results.username });
});

const User = model('User', userSchema);

module.exports = User;
