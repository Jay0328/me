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

exports.getTagNames = async ctx => {
  try {
    const tagNames = await Tags.getTagNames();
    ctx.status = 200;
    ctx.body = tagNames;
  }
  catch (e) {
    ctx.throw(e.status || 500, e);
  }
};
