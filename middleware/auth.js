const config = require('config');
const jwt = require('jsonwebtoken');
const status = require('../config/statusCodes');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) return res.status(status.BAD_REQUEST).json({ msg: 'No token, authorizaton denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(status.UNAUTHORIZED).json({ msg: 'Token is not valid' });
  }
  return null;
}

module.exports = auth;
