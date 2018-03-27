const Articles = require('../models/articles');
const asyncMiddleware = require('../utils/asyncMiddleware');
const readArticlePreviews = require('../utils/readArticlePreview');

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
      const filePath = resolve(__dirname, `../../blog/articles/${year}-${month}-${day}-${title}.md`);
      const content = await readFileSync(filePath, 'utf-8');
      res.status(200).json({ title, tags, content });
    }
    else res.status(404).json({ err: '文章不存在' });
  }
  catch (err) {
    res.status(404).json({ err: '文章不存在' });
    throw err;
  }
});
