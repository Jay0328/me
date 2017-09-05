'use strict';

const express = require('express');
const authApi = require('./authApi');
const articlesApi = require('./articlesApi');
const tagsApi = require('./tagsApi');
const router = express.Router();

router.use('/authenticate', authApi);
router.use('/articles', articlesApi);
router.use('/tags', tagsApi);

module.exports = router;