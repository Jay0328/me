const express = require('express');
const auth = require('./auth');
const articles = require('./articles');
const tags = require('./tags');
const categories = require('./categories');
const router = express.Router();

router.use('/authenticate', auth);
router.use('/articles', articles);
router.use('/tags', tags);
router.use('/categories', categories);

module.exports = router;