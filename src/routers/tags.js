const Router = require('koa-router');
const { getArticlesInTags } = require('../controllers/tags');

const router = new Router();

router
  .get('/', getArticlesInTags);

module.exports = router;