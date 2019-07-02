const express = require('express');
const auth = require('../../middleware/auth');
const status = require('../../config/statusCodes');

const router = express.Router();

const Meal = require('../../models/Meal');


// @route GET api/meals
// @desc Get All Meals
// @access Public
router.get('/', (req, res) => {
  Meal.find()
    .sort({
      name: 1,
    })
    .then(items => res.json(items));
});

// @route   POST api/meals
// @desc    Create A Meal
// @access  Private
// TODO: auth
router.post('/', auth, (req, res) => {
  const newMeal = new Meal({
    name: req.body.name,
    description: req.body.description,
    imageURL: req.body.imageURL,
  });

  newMeal.save()
    .then(item => res.json({
      success: true,
      item,
    }))
    .catch(error => res.json({
      success: false,
      ...error,
    }));
});

// @route   DELETE api/meals/:id
// @desc    Delete A Meal
// @access  Private
router.delete('/:id', auth, (req, res) => {
  const {
    id,
  } = req.params;

  Meal.remove({
    _id: id,
  })
    .then(() => res.json({
      success: true,
    }))
    .catch(err => res.status(status.BAD_REQUEST).json({
      success: false,
      error: err,
    }));
});


// @route   PATCH api/reserves/:id
// @desc    Update A Meal
// @access  Private
router.patch('/:id', auth, (req, res) => {
  const {
    id,
  } = req.params;
  const {
    body,
  } = req;

  Meal.updateOne({
    _id: id,
  }, {
    $set: body,
  })
    .then(item => res.json({
      success: true,
      item,
    }))
    .catch(err => res.status(status.BAD_REQUEST).json({
      success: false,
      error: err,
    }));
});


module.exports = router;
