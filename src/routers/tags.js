const Router = require('koa-router');
const { getArticlesInTags, getTagNames } = require('../controllers/tags');

const router = new Router();

router
  .get('/', getArticlesInTags)
  .get('/names', getTagNames);

module.exports = router;