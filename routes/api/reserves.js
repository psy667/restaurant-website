const express = require('express');
const auth = require('../../middleware/auth');
const status = require('../../config/statusCodes');

const router = express.Router();

const Reserve = require('../../models/Reserve');

// @route GET api/reserves
// @desc Get All Meals
// @access Private
router.get('/', auth, (req, res) => {
  Reserve.find()
    .sort({
      day: 1,
    })
    .then(items => res.json(items));
});

// @route   POST api/reserves
// @desc    Create A Meal
// @access  Public
// TODO: auth
router.post('/', (req, res) => {
  const newReserve = new Reserve({
    name: req.body.name,
    day: req.body.day,
    count_of_guests: req.body.count_of_guests,
    tel: req.body.tel,
    email: req.body.email,
  });

  newReserve.save()
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

  Reserve.remove({
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

  Reserve.updateOne({
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
