const Router = require('koa-router');
const send = require('koa-send');
const path = require('path');
const router = new Router();

const sendIndex = async ctx => {
    await send(ctx, 'index.html', { root: path.resolve(__dirname, '../../build') });
};

// Routers will be solved by client
router
    .get('*', sendIndex);

module.exports = router;