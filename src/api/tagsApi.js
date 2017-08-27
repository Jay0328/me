'use strict';

const express = require('express');
const mongoose = require('mongoose');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { database } = require('../config.js');
const asyncMiddleware = require('../utils/asyncMiddleware.js');
const Tags = require('../models/tags.js');
const router = express.Router();
mongoose.Promise = Promise;

router.route('')
  .get(asyncMiddleware(async (req, res, next) => {
    try {
      await mongoose.connect(database, { useMongoClient: true });
      const tags = await Tags.find().populate('articles', ['year', 'month', 'day', 'title', 'url']).exec();
      res.status(200).json({ tags });
    }
    catch (err) {
      res.status(404).json({ err: '取得標籤錯誤' });
      throw err;
    }
  }));

module.exports = router;