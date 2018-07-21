const Router = require('koa-router');
const { isAuth } = require('../middlewares/auth');
const { verifyAuth, login } = require('../controllers/auth');

const router = new Router();

router
  .get('/', isAuth, verifyAuth)
  .post('/', login);

module.exports = router;
