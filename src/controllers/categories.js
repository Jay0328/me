const Categories = require('../models/categories');

exports.getCategoriesAndArticlesCount = async (ctx, next) => {
  try {
    const categories = await Categories.getCategoriesAndArticlesCount();
    ctx.status = 200;
    ctx.body = {
      categories
    };
  }
  catch (e) {
    ctx.throw(e.status || 500, e);
  }
};

exports.getArticlesInCategory = async (ctx, next) => {
  const categoryName = decodeURIComponent(ctx.params.category);
  try {
    const { articles } = await Categories.getArticlesInCategory(categoryName);
    ctx.status = 200;
    ctx.body = {
      articles
    };
  }
  catch (e) {
    ctx.throw(e.status || 500, e);
  }
};
