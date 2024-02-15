const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionsSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      Required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionsSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

//virtual to display reactions count
ThoughtSchema.virtual('reactionsCount').get(function () {
  return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtSchema);

module.exports = Thoughts;
