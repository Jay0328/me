const express = require('express');
const router = express.Router();
const { isAuth, verifyAuth, login } = require('../middlewares/auth');

router
  .route('/')
  .get(isAuth, verifyAuth)
  .post(login);

module.exports = router;