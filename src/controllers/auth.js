const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const { secret } = require('../config');

const handleUser = (user, password1, password2, ctx) => {
  if (!user) {
    ctx.throw(401, {
      message: [{
        field: 'username',
        errMsg: '帳號錯誤或帳號不存在'
      }]
    });
  }
  else if (!user.validPassword(password1, password2)) {
    ctx.throw(401, {
      message: [{
        field: 'password1',
        errMsg: '密碼錯誤'
      },
      {
        field: 'password2',
        errMsg: '密碼錯誤'
      }]
    });
  }
  else {
    ctx.status = 200;
    ctx.body = {
      token: user.generateJwt()
    };
  }
};

exports.verifyAuth = async ctx => {
  ctx.status = ctx.state.isAuth ? 200 : 401;
};

exports.login = async ctx => {
  const {
    username: { value: username },
    password1: { value: password1 },
    password2: { value: password2 }
  } = ctx.request.body;
  try {
    const user = await User.findOne({ username });
    handleUser(user, password1, password2, ctx);
  }
  catch (e) {
    ctx.throw(e.status || 500, e);
  }
};
