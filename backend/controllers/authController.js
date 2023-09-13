const httpStatusCode  = require('../constants/httpStatusCode');
const {validationResult} = require('express-validator');
const { JWT_KEY } = require('../constants/apiConsts');
const HttpError = require("../models/httpError");
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        next(new HttpError('The passed inputs are wrong, please check the data', httpStatusCode.UNPROCESSABLED));
    }

    let user;
    const { name, email, password, image } = req.body;
    const existUser = await User.findOne({ where: { email } });

    if(existUser) return next(new HttpError('An user with that email exist',httpStatusCode.UNPROCESSABLED));

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        user = await User.create({ name, image: req.file.path, email, password: hashedPassword });    
    } catch (error) {
        console.log(error);
        return next( new HttpError('Error creating user', httpStatusCode.INTERNAL_SERVER_ERROR));
    }
    
    const token = generateToken(user);
    res.status(httpStatusCode.OK).json({ user: { userId: user.id, email:user.email, name: user.name}, token });
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) return next(new HttpError('Loggin  failed, invalid credentials please try again.!',httpStatusCode.INTERNAL_SERVER_ERROR))

    const token = generateToken(user);
    res.status(httpStatusCode.OK).json({ user: { userId: user.id, email:user.email, name: user.name}, token });
};

const generateToken = (user) => {
    return jwt.sign({ userId: user.id }, JWT_KEY, { expiresIn: '1h' });
};

module.exports = {
  registerUser,
  loginUser,
};
