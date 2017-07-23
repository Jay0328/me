'use strict';

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const config = require('../config.js');
const router = express.Router();
mongoose.connect(config.database, { useMongoClient: true });

router.route('/authenticate')
  .get((req, res) => {
    if (!req.headers.authorization) res.sendStatus(401);
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        throw err;
        res.status(401).json({});
      }
      res.status(200).json({});
    });
  })
  .post((req, res) => {
    const { username: { value: username } } = req.body;
    const { password1: { value: password1 } } = req.body;
    const { password2: { value: password2 } } = req.body;
    User.findOne({ username }, (err, user) => {
      if (err) throw err;
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
    });
  });

module.exports = router;