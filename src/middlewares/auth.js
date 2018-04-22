const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const asyncMiddleware = require('../utils/asyncMiddleware');
const { secret } = require('../config');

const handleUser = (user, password1, password2, res) => {
  if (!user)
    res.status(401).json({
      err: [{
        field: 'username',
        errMsg: '帳號錯誤或帳號不存在'
      }]
    });
  else if (!user.validPassword(password1, password2))
    res.status(401).json({
      err: [{
        field: 'password1',
        errMsg: '密碼錯誤'
      },
      {
        field: 'password2',
        errMsg: '密碼錯誤'
      }]
    });
  else res.status(200).json({ token: user.generateJwt() });
};

const handleUserError = (err, res) => {
  throw err;
  res.status(401).json({
    err: [{
      field: 'username',
      errMsg: '資料庫錯誤'
    }]
  });
};

exports.isAuth = asyncMiddleware(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(403).json({});
  }
  const token = authorization.split('Bearer ')[1];
  try {
    const _id = jwt.verify(token, secret);
    const user = await User.findOne({ _id });
    req.isAuth = !!user;
    if (req.isAuth) {
      next();
    }
    else {
      res.status(401).json({});
    }
  }
  catch (err) {
    res.status(403).json({});
    throw err;
  }
});

exports.verifyAuth = asyncMiddleware(async (req, res) => {
  res.status(req.isAuth ? 200 : 401).json({});
});

exports.login = asyncMiddleware(async (req, res, next) => {
  const { username: { value: username } } = req.body;
  const { password1: { value: password1 } } = req.body;
  const { password2: { value: password2 } } = req.body;
  try {
    const user = await User.findOne({ username });
    handleUser(user, password1, password2, res);
  }
  catch (err) {
    handleUserError(err, res);
  }
});
