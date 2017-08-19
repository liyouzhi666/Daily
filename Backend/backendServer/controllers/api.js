const config = require('./config');
const Sequelize = require('sequelize');

console.log('init sequelize...');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

var products = [{
    name: 'iPhone',
    price: 6999
}, {
    name: 'Kindle',
    price: 999
}];

module.exports = {
    'GET /api/products': async (ctx, next) => {
	ctx.response.set('Access-Control-Allow-Origin','*');
        ctx.response.type = 'application/json';
        ctx.response.body = {
            products: products
        };
    },

    'GET /api/daily': async (ctx, next) => {
        const querystring = require('querystring');
        const moment = require('moment');
        if (ctx.request.querystring) {
            var date = querystring.parse(ctx.request.querystring).date;
        } else {
            var date = moment().subtract(1,'days').format('YYYYMMDD')
        }
        var myItems = [];
        var Daily = sequelize.define('daily', {
            name: Sequelize.TEXT,
            href: Sequelize.TEXT
        },{
            tableName: date +'_码农日报',
            timestamps: false
        });

        var items = await Daily.findAll();
        console.log(`find ${items.length} items:`);
        for (let item of items) {
            var name = new Buffer(item.name, 'base64').toString();
            // console.log(name);
            var href = new Buffer(item.href, 'base64').toString();
            // console.log(href);
            let obj = {'name':name,'href':href};
            myItems.push(obj);
        }         
        ctx.response.set('Access-Control-Allow-Origin','*');
        ctx.response.type = 'application/json';
        ctx.response.body = {
            items: myItems
        };
    },

    'POST /api/products': async (ctx, next) => {
        var p = {
            name: ctx.request.body.name,
            price: ctx.request.body.price
        };
        products.push(p);
        ctx.response.type = 'application/json';
        ctx.response.body = p;
    }
};
