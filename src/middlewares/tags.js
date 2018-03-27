const Tags = require('../models/tags');
const asyncMiddleware = require('../utils/asyncMiddleware');

exports.getArticlesInTags = asyncMiddleware(async (req, res, next) => {
  try {
    const tags = await Tags.getArticlesInTags();
    res.status(200).json({ tags });
  }
  catch (err) {
    res.status(404).json({ err: '取得標籤錯誤' });
    throw err;
  }
});
