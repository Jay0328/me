'use strict';

const express = require('express');
const mongoose = require('mongoose');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { database } = require('../config.js');
const asyncMiddleware = require('../utils/asyncMiddleware.js');
const Articles = require('../models/articles.js');
const router = express.Router();
mongoose.Promise = Promise;

router.route('/')
  .get(asyncMiddleware(async (req, res, next) => {
  }))
  .post(asyncMiddleware(async (req, res, next) => {
    const { year, month, day, title } = req.body;
    try {
      await mongoose.connect(database, { useMongoClient: true });
      const article = await Articles.findOne({ year, month, day, title });
      if (article) {
        const content = await readFileSync(resolve(__dirname, `../../articles/${year}-${month}-${day}-${title}.md`),
          'utf-8');
        res.status(200).json({ content });
      }
      else res.status(404).json({ err: '文章不存在' });
    }
    catch (err) {
      res.status(404).json({ err: '文章不存在' });
      throw err;
    }
  }));

module.exports = router;