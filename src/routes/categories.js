const express = require('express');
const router = express.Router();
const { getCategoriesAndArticlesCount, getArticlesInCategory } = require('../middlewares/categories');

router
  .route('')
  .get(getCategoriesAndArticlesCount);

router
  .route('/:category')
  .get(getArticlesInCategory);

module.exports = router;