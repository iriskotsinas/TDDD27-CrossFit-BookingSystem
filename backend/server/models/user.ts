import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    max: 32,
  },
  lastname: {
    type: String,
    required: true,
    max: 32,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  sessions: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
  },
  role: {
    type: String,
    required: true,
  },

});

const User = mongoose.model('User', userSchema);

export { User };
