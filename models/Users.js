const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const Thoughts = require('./Thoughts');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      validate: [isEmail, 'Invalid email format.'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
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

//virtual to display friend count
UserSchema.virtual('friendsCount').get(function () {
  return this.friends.length;
});

const Users = model('Users', UserSchema);

module.exports = Users;
