import cors from '@koa/cors';
import Koa, { Context } from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import Router from 'koa-router';

const app = new Koa<any, Context>();

if (process.env.NODE_ENV === 'production') {
  app.proxy = true;
}

const router = new Router<any, Context>();

router.get('/api', (ctx) => {
  ctx.body = 'API running';
});

app.use(router.routes()).use(router.allowedMethods());
app.use(logger());
app.use(cors({ maxAge: 86_400 }));
app.use(bodyParser());

export default app;
