const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');

//  Intialize app.
const app = new Koa();
const router = new KoaRouter();

const PORT = 3000; 


// JSON Prettier Middleware
app.use(json());

// Simple Middlware Examples
// app.use(async ctx => ctx.body = 'Hello World!');
// app.use(async ctx => ctx.body = {"msg": "Hello World"});

router.get('/test', ctx => ( ctx.body = "Hello Test"));

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));