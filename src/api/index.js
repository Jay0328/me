'use strict';

const express = require('express');
const authApi = require('./authApi');
const articlesApi = require('./articlesApi');
const tagsApi = require('./tagsApi');
const categoriesApi = require('./categoriesApi');
const router = express.Router();

router.use('/authenticate', authApi);
router.use('/articles', articlesApi);
router.use('/tags', tagsApi);
router.use('/categories', categoriesApi);

module.exports = router;