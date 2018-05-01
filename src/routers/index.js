const Router = require('koa-router');
const auth = require('./auth');
const articles = require('./articles');
const tags = require('./tags');
const categories = require('./categories');
const images = require('./images');

const router = new Router({ prefix: '/api' });

router
  .use('/authenticate', auth.routes())
  .use('/articles', articles.routes())
  .use('/tags', tags.routes())
  .use('/categories', categories.routes())
  .use('/images', images.routes());

module.exports = router;
