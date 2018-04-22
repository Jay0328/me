const Router = require('koa-router');
const { getArticlesInPage, getArticle, postArticle } = require('../controllers/articles');
const { isAuth } = require('../middlewares/auth');

const router = new Router();

router
  .get('/', getArticlesInPage)
  .get('/article', getArticle)
  .post('/article', isAuth, postArticle);

module.exports = router;