const http = require('http');
const Koa = require('koa');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const serve = require('koa-static');
const path = require('path');
const config = require('../config');
const errorHandler = require('../middlewares/errorHandler');
const routers = require('../routers');
const indexRoute = require('./indexRoute');

const createServer = () => {
  const app = new Koa();

  app.use(errorHandler);
  app.use(helmet());
  app.use(bodyParser({
    onerror(e, ctx) {
      ctx.throw(422, 'body parse error')
    }
  }));
  if (process.env.NODE_ENV !== 'production') {
    app.use(logger());
  }
  //  Static file
  app.use(serve(path.resolve(__dirname, '../../client/build'), config.server.staticConfig));
  app.use(serve(path.resolve(__dirname, '../../client/assets'), config.server.staticConfig));
  app.use(serve(path.resolve(__dirname, '../../blog'), config.server.staticConfig));

  //  Api
  app.use(routers.routes());

  //  React Routers   error routers will be resolved by React
  app.use(indexRoute.routes());

  const server = http.createServer(app.callback()).listen(config.server.port, () => {
    console.log(`Http server is listening on ${config.server.port}`);
  });
};

module.exports = createServer;
