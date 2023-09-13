const { UNAUTHORIZED }  = require('../constants/httpStatusCode');
const { JWT_KEY } = require('../constants/apiConsts');
const HttpError = require("../models/httpError");
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) throw new Error('Access denied. No token provided.');
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    req.userData = {userId: decoded.userId}
    next();
  } catch (ex) {
    return next(new HttpError("Authentication failed!!",UNAUTHORIZED));
  }
};

module.exports = authenticateUser;
