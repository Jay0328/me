module.exports = async (ctx, next) => {
  try {
    await next();
    if (ctx.status >= 400) {
      const err = new Error();
      err.statusCode = ctx.status;
      throw err;
    }
  }
  catch (error) {
    let { code, message } = error;
    ctx.status = error.statusCode || error.status || 500;
    if (ctx.status === 400) {
      code = code || 'BAD REQUEST';
    }
    else if (ctx.status === 401) {
      code = code || 'UNAUTHORIZED';
    }
    else if (ctx.status === 403) {
      code = code || 'FORBIDDEN';
    }
    else if (ctx.status === 404) {
      code = code || 'NOT FOUND';
    }
    else if (ctx.status === 500) {
      code = code || 'INTERNAL SERVER ERROR';
    }
    ctx.body = {
      code: code || 'ERROR',
      message: message || 'Error'
    };
  }
};
