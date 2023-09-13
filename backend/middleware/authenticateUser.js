const httpStatusCode  = require('../constants/httpStatusCode');
const HttpError = require("../models/httpError");
const env = require('../constants/apiConsts');
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) throw new Error('Access denied. No token provided.');
  try {
    const decoded = jwt.verify(token, env.JWT_KEY);
    req.userData = {userId: decoded.userId}
    next();
  } catch (ex) {
    return next(new HttpError("Authentication failed!!",httpStatusCode.UNAUTHORIZED));
  }
};

module.exports = authenticateUser;
