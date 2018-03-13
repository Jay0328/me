'use strict';

const express = require('express');
const mongoose = require('mongoose');
const { readFile, readFileSync } = require('fs');
const { resolve } = require('path');
const { database } = require('../config.js');
const asyncMiddleware = require('../utils/asyncMiddleware.js');
const Categories = require('../models/categories.js');
const router = express.Router();
mongoose.Promise = Promise;

router.route('')
  .get(asyncMiddleware(async (req, res, next) => {
    try {
      await mongoose.connect(database);
      const categories = await Categories.getCategories();
      res.status(200).json({ categories });
    }
    catch (err) {
      res.status(404).json({ err: '取得分類錯誤' });
      throw err;
    }
  }));

router.route('/:category')
  .get(asyncMiddleware(async (req, res, next) => {
    const categoryName = decodeURIComponent(req.params.category);
    try {
      await mongoose.connect(database);
      const categoryArchive = await Categories.getCategoryArchive(categoryName);
      const totalArticlesCount = categoryArchive.articles.length;
      res.status(200).json({ categoryArchive, totalArticlesCount });
    }
    catch (err) {
      res.status(404).json({ err: '取得分類錯誤' });
      throw err;
    }
  }));

module.exports = router;