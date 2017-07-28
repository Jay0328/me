'use strict';

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const config = require('../config.js');
const asyncMiddleware = require('../utils/asyncMiddleware.js');
const router = express.Router();
mongoose.Promise = Promise;
mongoose.connect(config.database, { useMongoClient: true });

router.route('/authenticate')
  .get((req, res) => {
    if (!req.headers.authorization) res.status(401).json({});
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, config.secret);
      res.status(200).json({});
    }
    catch (err) {
      throw err;
      res.status(401).json({});
    }
  })
  .post(asyncMiddleware(async (req, res, next) => {
    const { username: { value: username } } = req.body;
    const { password1: { value: password1 } } = req.body;
    const { password2: { value: password2 } } = req.body;
    try {
      const user = await User.findOne({ username });
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
    }
    catch (err) {
      throw err;
      res.status(401).json({
        err: [{
          field: 'username',
          errMsg: '資料庫錯誤'
        }]
      });
    }
  }));

module.exports = router;