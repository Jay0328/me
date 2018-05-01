const Router = require('koa-router');
const {
  getCategoriesAndArticlesCount,
  getCategoryNames,
  getArticlesInCategory
} = require('../controllers/categories');

const router = new Router();

router
  .get('/', getCategoriesAndArticlesCount)
  .get('/names', getCategoryNames)
  .get('/:category', getArticlesInCategory);

module.exports = router;