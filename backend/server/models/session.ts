import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  activity: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  expireAt: {
    type: Date,
  },
  users: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  maxSlots: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
});

const Session = mongoose.model('Session', sessionSchema);

// eslint-disable-next-line import/prefer-default-export
export { Session };
