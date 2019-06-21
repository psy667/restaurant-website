const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const status = require('../../config/statusCodes');
// const auth = require('../../middleware/auth');

const User = require('../../models/User');


const JWTSign = (userId, jwtSecret, options) => new Promise((resolve, reject) => {
  jwt.sign(userId, jwtSecret, options, (err, token) => {
    if (err) {
      reject(err);
      return null;
    }

    return resolve({ token });
  });
});

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(status.BAD_REQUEST).json({ msg: 'Please enter all fields' });
  }

  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(status.NOT_FOUND).json({ msg: 'User Does not exist' });
      }
      const isMatch = bcrypt.compare(password, user.password);
      return { isMatch, user };
    })
    .then(({ isMatch, user }) => {
      if (!isMatch) {
        return res.status(status.BAD_REQUEST).json({ msg: 'Invalid credentials' });
      }

      return JWTSign({ id: user.id }, config.get('jwtSecret'), { expiresIn: 3600 });
    })
    .then(result => res.json(result));
});

module.exports = router;
