const mongoose = require('mongoose');

const { Schema } = mongoose;

const MealSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Meal = mongoose.model('meal', MealSchema);
module.exports = Meal;
