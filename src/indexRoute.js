'use strict';

const express = require('express');
const path = require('path');
const router = express.Router();

const sendIndex = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
};

// Routers will be solved by Angular
router.route('*')
    .get(sendIndex);

module.exports = router;