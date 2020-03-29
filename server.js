const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const path = require('path');
const render = require('koa-ejs');

//  Intialize app.
const app = new Koa();
const router = new KoaRouter();

const PORT = 3000; 
// Replace with DB

// JSON Prettier Middleware
app.use(json());

// Simple Middlware Examples
// app.use(async ctx => ctx.body = 'Hello World!');
// app.use(async ctx => ctx.body = {"msg": "Hello World"});
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt:'html', 
  cache: false, 
  debug: false
});

router.get('/', async ctx => {
  await ctx.render('index', {
    title: "Things I Love:"
  });
});

// Index
router.get('/', async ctx => await ctx.render('index'));

router.get('/test', ctx => ( ctx.body = "Hello Test"));

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));