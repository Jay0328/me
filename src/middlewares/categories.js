const Categories = require('../models/categories');
const asyncMiddleware = require('../utils/asyncMiddleware');

exports.getCategories = asyncMiddleware(async (req, res, next) => {
  try {
    const categories = await Categories.getCategories();
    res.status(200).json({ categories });
  }
  catch (err) {
    res.status(404).json({ err: '取得分類錯誤' });
    throw err;
  }
});

exports.getArticlesInCategory = asyncMiddleware(async (req, res, next) => {
  const categoryName = decodeURIComponent(req.params.category);
  try {
    const { articles } = await Categories.getArticlesInCategory(categoryName);
    res.status(200).json({ articles });
  }
  catch (err) {
    res.status(404).json({ err: '取得分類錯誤' });
    throw err;
  }
});
