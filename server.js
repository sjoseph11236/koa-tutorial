const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

//  Intialize app.
const app = new Koa();
const router = new KoaRouter();

const PORT = 3000; 
// Replace with DB
const things  = ['My Family', 'Programming', 'Music'];

// JSON Prettier Middleware
app.use(json());
// Body Parser Middleware
app.use(bodyParser());

// Add addition properties to context
app.context.user = 'Sayeed';

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
// Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);


async function index(ctx) {
    await ctx.render('index', {
    title: "Things I Love:",
    things: things 
  });
};

// Show add page
async function showAdd(ctx) {
    await ctx.render('add');
};

// Add thing
async function add(ctx) {
  const body = ctx.request.body;
  things.push(body.thing);
  ctx.redirect('/');
}

// router.get('/', async ctx => {
//   await ctx.render('index', {
//     title: "Things I Love:",
//     things: things 
//   });
// });




// Index
// router.get('/', async ctx => await ctx.render('index'));

router.get('/test', ctx => ( ctx.body = `Hello ${ctx.user}`));
router.get('/test/:name', ctx => ( ctx.body = `Hello ${ctx.params.name}`));

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));