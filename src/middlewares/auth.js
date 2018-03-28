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

exports.verifyAuth = asyncMiddleware(async (req, res) => {
  if (!req.headers.authorization) res.status(401).json({});
  const token = req.headers.authorization.split(' ')[1];
  try {
    const _id = jwt.verify(token, secret);
    const user = await User.findOne({ _id });
    res.status(user ? 200 : 401).json({});
  }
  catch (err) {
    throw err;
    res.status(401).json({});
  }
});

exports.register = asyncMiddleware(async (req, res, next) => {
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
