const Router = require('koa-router');
const { uploadImage } = require('../controllers/images');
const { isAuth } = require('../middlewares/auth');

const router = new Router();

router
  .post('/', isAuth, uploadImage);

module.exports = router;
