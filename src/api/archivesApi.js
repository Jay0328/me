'use strict';

const express = require('express');
const mongoose = require('mongoose');
const { database } = require('../config.js');
const asyncMiddleware = require('../utils/asyncMiddleware.js');
const Articles = require('../models/articles.js');
const router = express.Router();
mongoose.Promise = Promise;

router.route('')
  .get(asyncMiddleware(async (req, res, next) => {
    try {
      await mongoose.connect(database, { useMongoClient: true });
      const totalArticlesCount = await Articles.count();
      const archive = await Articles.getArchive();
      res.status(200).json({ archive, totalArticlesCount });
    }
    catch (err) {
      res.status(404).json({ err: '取得歸檔錯誤' });
      throw err;
    }
  }));

module.exports = router;