const express = require('express');
const router = express.Router();
const { getArticlesInPage, getArticle, postArticle } = require('../middlewares/articles');
const { isAuth } = require('../middlewares/auth');

router
  .route('/page/:page')
  .get(getArticlesInPage);

router
  .route('/article')
  .get(getArticle)
  .post(isAuth, postArticle);

module.exports = router;