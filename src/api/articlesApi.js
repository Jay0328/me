'use strict';

const express = require('express');
const mongoose = require('mongoose');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const config = require('../config.js');
const asyncMiddleware = require('../utils/asyncMiddleware.js');
const router = express.Router();
mongoose.Promise = Promise;
mongoose.connect(config.database, { useMongoClient: true });

router.route('/')
  .post(asyncMiddleware(async (req, res, next) => {
    const { year, month, day, title } = req.body;
    try {
      const content = await readFileSync(resolve(__dirname, `../../articles/${year}-${month}-${day}-${title}.md`),
        'utf-8');
      res.status(200).json({ content });
    }
    catch (err) {
      res.status(404).json({ err: '文章不存在' });
      throw err;
    }
  }));

module.exports = router;