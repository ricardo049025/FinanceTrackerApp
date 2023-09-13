const httpStatusCode  = require('../constants/httpStatusCode');
const { JWT_KEY } = require('../constants/apiConsts');
const HttpError = require("../models/httpError");
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res, next) => {
    const { email, password } = req.body;
    const existUser = await User.findOne({ where: { email } });

    if(existUser) return next(new HttpError('An user with that email exist',httpStatusCode.UNPROCESSABLED));

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    const token = generateToken(user);
    res.status(httpStatusCode.OK).json({ user: { id: user.id, email:user.email}, token });
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) return next(new HttpError('Loggin  failed, invalid credentials please try again.!',httpStatusCode.INTERNAL_SERVER_ERROR))

    const token = generateToken(user);
    res.status(httpStatusCode.OK).json({ user: { id: user.id, email:user.email}, token });
};

const generateToken = (user) => {
    return jwt.sign({ userId: user.id }, JWT_KEY, { expiresIn: '1h' });
};

module.exports = {
  registerUser,
  loginUser,
};
