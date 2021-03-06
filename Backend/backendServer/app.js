const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const cors = require('koa-cors');

const app = new Koa();

app.use(cors());

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// parse request body:
app.use(bodyParser(
    {
        extendTypes: {
            json: ['application/x-www-form-urlencoded']
        }
    }
));
  
// add controller:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');
