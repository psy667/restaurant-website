const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReserveSchema = new Schema({
  day: {
    type: Date,
    required: true,
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
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Reserve = mongoose.model('reserve', ReserveSchema);
module.exports = Reserve;
