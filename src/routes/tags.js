const express = require('express');
const router = express.Router();
const { getArticlesInTags } = require('../middlewares/tags');

router
  .route('')
  .get(getArticlesInTags);

module.exports = router;