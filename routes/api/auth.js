const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const status = require('../../config/statusCodes');
const auth = require('../../middleware/auth');

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
        throw new Error('Неверный e-mail');
      }
      const isMatch = bcrypt.compare(password, user.password);

      return isMatch;
    })
    .then((isMatch) => {
      if (!isMatch) {
        throw new Error('Неверный пароль');
      }

      return JWTSign({ id: '5d07cb3e25f98439080e6eec' }, config.get('jwtSecret'), { expiresIn: 7200 });
    })
    .then(result => res.json(result))
    .catch(err => res.status(status.BAD_REQUEST).json({ result: 'error', err: err.message }));
});

router.get('/', auth, (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router;
