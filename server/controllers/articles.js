const Articles = require('../models/articles');
const Categories = require('../models/categories');
const Tags = require('../models/tags');
const { readArticlePreviews, readArticleContent, writeArticleFile } = require('../utils/handleArticleFile');

exports.getArticlesInPage = async ctx => {
  const page = (ctx.request.query.page || 1) | 0;
  try {
    if (page > 0) {
      const totalArticles = await Articles.countDocuments();
      const totalPage = Math.ceil(totalArticles / 10);
      let articles = await Articles.getArticlesInPage(page);
      articles = await readArticlePreviews(articles);
      ctx.status = 200;
      ctx.body = {
        articles,
        totalPage
      };
    }
    else {
      ctx.throw(400, 'page is not integer');
    }
  }
  catch (e) {
    ctx.throw(e.status || 500, e);
  }
};

exports.getArticle = async ctx => {
  const { year, month, day, url } = ctx.request.query;
  try {
    const article = await Articles.getArticle(year, month, day, url);
    if (article) {
      const { title, tags } = article;
      const content = await readArticleContent(article);
      ctx.status = 200;
      ctx.body = {
        title,
        tags,
        content
      };
    }
    else {
      ctx.throw(404);
    }
  }
  catch (e) {
    ctx.throw(e.status || 500, e);
  }
};

exports.postArticle = async ctx => {
  const article = { ...ctx.request.body };
  try {
    const category = await Categories.getCategoryByNameOrNewOne(article.category);
    const tags = await Tags.getTagsByNameOrNewSome(article.tags);
    article.category = category._id;
    article.tags = tags.map(tag => tag._id);
    const _id = await Articles.postArticle(article);
    await category.addArticleToCategory(_id);
    await tags.reduce(async (acc, tag) => {
      await acc;
      return tag.addArticleToTag(_id);
    }, Promise.resolve());
    await writeArticleFile(article);
    ctx.status = 201;
  }
  catch (e) {
    ctx.throw(e.status || 500, e);
  }
};
