'use strict';

const express = require('express');
const mongoose = require('mongoose');
const config = require('../config.js');
const router = express.Router();
mongoose.Promise = Promise;
mongoose.connect(config.database, { useMongoClient: true });

router.route('/')
  .post((req, res) => {
    res.status(200).json({ content: '# Hello   \n## RRRR' });
  });

module.exports = router;