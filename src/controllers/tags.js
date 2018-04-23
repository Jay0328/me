const Tags = require('../models/tags');

exports.getArticlesInTags = async ctx => {
  try {
    const tags = await Tags.getArticlesInTags();
    ctx.status = 200;
    ctx.body = {
      tags
    };
  }
  catch (e) {
    ctx.throw(e.status || 500, e);
  }
};
