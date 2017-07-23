'use strict';

const express = require('express');
const authApi = require('./authApi');
const router = express.Router();

router.use('/', authApi);

module.exports = router;