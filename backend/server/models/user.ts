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

});

const User = mongoose.model('User', userSchema);

// eslint-disable-next-line import/prefer-default-export
export { User };