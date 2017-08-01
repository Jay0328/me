'use strict';

const express = require('express');
const authApi = require('./authApi');
const articlesApi = require('./articlesApi');
const router = express.Router();

router.use('/authenticate', authApi);
router.use('/articles', articlesApi);

module.exports = router;