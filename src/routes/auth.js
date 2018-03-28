const express = require('express');
const router = express.Router();
const { verifyAuth, register } = require('../middlewares/auth');

router
  .route('/')
  .get(verifyAuth)
  .post(register);

module.exports = router;