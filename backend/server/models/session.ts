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
  users: {
    type: Array,
    required: true,
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

const Session = mongoose.model('Booking', sessionSchema);

// eslint-disable-next-line import/prefer-default-export
export { Session };
