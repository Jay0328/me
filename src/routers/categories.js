const Router = require('koa-router');
const { getCategoriesAndArticlesCount, getArticlesInCategory } = require('../controllers/categories');

const router = new Router();

router
  .get('/', getCategoriesAndArticlesCount)
  .get('/:category', getArticlesInCategory);

module.exports = router;