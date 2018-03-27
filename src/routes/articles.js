const express = require('express');
const router = express.Router();
const { getArticlesInPage, getArticle } = require('../middlewares/articles');

router
  .route('/page/:page')
  .get(getArticlesInPage);

router
  .route('/article')
  .get(getArticle);

module.exports = router;