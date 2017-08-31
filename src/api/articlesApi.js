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

router.route('/page/:page')
  .get(asyncMiddleware(async (req, res, next) => {
    const page = parseInt(req.params.page, 10);
    try {
      await mongoose.connect(database, { useMongoClient: true });
      const totalArticles = await Articles.count();
      const totalPage = Math.ceil(totalArticles / 10);
      const articles = await Articles.find().skip((page - 1) * 10).limit(10)
        .populate('tags', 'tagName').exec();
      res.status(200).json({ articles, totalPage });
    }
    catch (err) {
      res.status(404).json({ err: '取得文章列表錯誤' });
      throw err;
    }
  }));

router.route('/article')
  .get(asyncMiddleware(async (req, res, next) => {
    const { year, month, day, url } = req.query;
    try {
      await mongoose.connect(database, { useMongoClient: true });
      const article = await Articles.findOne({ year, month, day, url });
      if (article) {
        const { title } = article;
        const content = await readFileSync(resolve(__dirname, `../../articles/${year}-${month}-${day}-${title}.md`),
          'utf-8');
        res.status(200).json({ title, content });
      }
      else res.status(404).json({ err: '文章不存在' });
    }
    catch (err) {
      res.status(404).json({ err: '文章不存在' });
      throw err;
    }
  }));

module.exports = router;