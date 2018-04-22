const Articles = require('../models/articles');
const Categories = require('../models/categories');
const Tags = require('../models/tags');
const asyncMiddleware = require('../utils/asyncMiddleware');
const { readArticlePreviews, readArticleContent, writeArticleFile } = require('../utils/handleArticleFile');

exports.getArticlesInPage = asyncMiddleware(async (req, res, next) => {
  const page = parseInt(req.params.page, 10);
  try {
    const totalArticles = await Articles.count();
    const totalPage = Math.ceil(totalArticles / 10);
    let articles = await Articles.getArticlesInPage(page);
    articles = await readArticlePreviews(articles);
    res.status(200).json({ articles, totalPage });
  }
  catch (err) {
    res.status(404).json({ err: '取得文章列表錯誤' });
    throw err;
  }
});

exports.getArticle = asyncMiddleware(async (req, res, next) => {
  const { year, month, day, url } = req.query;
  try {
    const article = await Articles.getArticle(year, month, day, url);
    if (article) {
      const { title, tags } = article;
      const content = await readArticleContent(article);
      res.status(200).json({ title, tags, content });
    }
    else res.status(404).json({ err: '文章不存在' });
  }
  catch (err) {
    res.status(404).json({ err: '文章不存在' });
    throw err;
  }
});

exports.postArticle = asyncMiddleware(async (req, res, next) => {
  const article = { ...req.body };
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
    res.status(201).json({});
  }
  catch (err) {
    res.status(500).json({ err: '上傳錯誤' });
    throw err;
  }
});
