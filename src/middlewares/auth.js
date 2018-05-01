const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const { secret } = require('../config');

exports.isAuth = async (ctx, next) => {
  const { authorization } = ctx.request.headers;

  if (!authorization) {
    ctx.throw(403);
  }
  try {
    const token = authorization.split('Bearer ')[1];
    const _id = jwt.verify(token, secret);
    const user = await User.findOne({ _id });
    ctx.state.isAuth = !!user;
    if (ctx.state.isAuth) {
      await next();
    }
    else {
      ctx.throw(401);
    }
  }
  catch (e) {
    ctx.throw(e.status || 500, e);
  }
};