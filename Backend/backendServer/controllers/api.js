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

        try {
            var items = await Daily.findAll();
        } catch (err) {
            ctx.response.set('Access-Control-Allow-Origin','*');
            ctx.response.type = 'application/json';
            ctx.response.body = {
                items: [],
                error: err.message
            };
            return;
        }
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
            items: myItems,
            error: ''
        };
    },

    'POST /api/login': async (ctx, next) => {
        var p = {
            name: ctx.request.body.userName,
            pw: ctx.request.body.password
        };
        var User = sequelize.define('userInfo', {
            userName: Sequelize.STRING(255),
            password: Sequelize.STRING(255)
        },{
            tableName: 'User',
            timestamps: false
        });

        var myClient = await User.findAll({
            where: {
                userName: p.name
            }
        });
        ctx.response.set('Access-Control-Allow-Origin','*');
        ctx.response.type = 'application/json';
        if(myClient.length==0){
            ctx.response.body = {
                info: 'login failed!',
                error: '您输入的账号不存在！'
            };
        } else {
            if(myClient[0].password == p.pw) {
                ctx.response.body = {
                    info: 'login successed!',
                    error: ''
                };
            } else {
                ctx.response.body = {
                    info: 'login failed!',
                    error: '您输入的密码有误！'
                };
            }
        }

    },

    'POST /api/spgtest': async (ctx, next) => {
        var p = {
            userName: ctx.request.body.userName,
            password: ctx.request.body.password
        };
        ctx.response.type = 'application/json';
        // for(var i in ctx.request.body){
        //     console.log(i);
        //     p.userName = JSON.parse(i).userName;
        //     p.password = JSON.parse(i).password;
        // }
        ctx.response.set('Access-Control-Allow-Origin','*');
        if (p.userName === 'spg' && p.password === 'spg') {
            ctx.response.status = 200;
            ctx.response.set('Set-Cookie', 'SPGTEST=LoginSuccess; Path=/; Max-Age=7200');            
            ctx.response.body = {
                message: 'login success'
            };
        } else {
            ctx.response.status = 401;
            ctx.response.body = {
                code: 'auth:user_not_found',
                message: 'user not found or wrong password'
            };
        }
    }
};
