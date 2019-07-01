const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReserveSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  day: {
    type: Date,
  },
  count_of_guests: {
    type: Number,
    default: 1,
  },
  tel: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'waiting',
  },
});

const Reserve = mongoose.model('reserve', ReserveSchema);
module.exports = Reserve;
