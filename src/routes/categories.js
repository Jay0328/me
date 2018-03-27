const express = require('express');
const router = express.Router();
const { getCategories, getArticlesInCategory } = require('../middlewares/categories');

router
  .route('')
  .get(getCategories);

router
  .route('/:category')
  .get(getArticlesInCategory);

module.exports = router;