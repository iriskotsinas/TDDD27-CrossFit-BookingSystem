import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Data = mongoose.model('Booking', dataSchema);

// eslint-disable-next-line import/prefer-default-export
export { Data };
