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

    'PUT /api/collect': async (ctx, next) => {
        var Collection = sequelize.define('collection', {
            name: Sequelize.TEXT,
            href: Sequelize.TEXT,
            class: Sequelize.STRING(255),
            tags: Sequelize.TEXT,
            updatedAt: Sequelize.STRING(30),
            user: Sequelize.STRING(50)
        },{
            tableName: 'Collection',
            timestamps: false
        });
        var now = String(Date.now());
        try {
            var myCollection = await Collection.findById(ctx.request.body.id);
            var now = String(Date.now());
            myCollection.name = new Buffer(ctx.request.body.name).toString('base64');
            myCollection.href = new Buffer(ctx.request.body.href).toString('base64');
            myCollection.class = ctx.request.body.class;
            myCollection.tags = ctx.request.body.tags;
            myCollection.updatedAt = now;
            myCollection.user = ctx.request.body.user;
            await myCollection.save();
        } catch (err) {
            ctx.response.set('Access-Control-Allow-Origin','*');
            ctx.response.type = 'application/json';
            ctx.response.body = {
                info: 'edit failed!',
                error: err
            };
            return;
        }
        ctx.response.set('Access-Control-Allow-Origin','*');
        ctx.response.type = 'application/json';
        ctx.response.body = {
            info: 'edit successed!',
            error: ''
        };
    },

    'DELETE /api/collect': async (ctx, next) => {
        const querystring = require('querystring');
        if (ctx.request.querystring) {
            var myID = querystring.parse(ctx.request.querystring).id;
        }
        var Collection = sequelize.define('collection', {
            name: Sequelize.TEXT,
            href: Sequelize.TEXT,
            class: Sequelize.STRING(255),
            tags: Sequelize.TEXT,
            updatedAt: Sequelize.STRING(30),
            user: Sequelize.STRING(50)
        },{
            tableName: 'Collection',
            timestamps: false
        });
        var now = String(Date.now());
        try {
            var myCollection = await Collection.findById(myID);
            await myCollection.destroy();
        } catch (err) {
            ctx.response.set('Access-Control-Allow-Origin','*');
            ctx.response.type = 'application/json';
            ctx.response.body = {
                info: 'delete failed!',
                error: err
            };
            return;
        }
        ctx.response.set('Access-Control-Allow-Origin','*');
        ctx.response.type = 'application/json';
        ctx.response.body = {
            info: 'delete successed!',
            error: ''
        };
    },

    'POST /api/collect': async (ctx, next) => {
        var Collection = sequelize.define('collection', {
            name: Sequelize.TEXT,
            href: Sequelize.TEXT,
            class: Sequelize.STRING(255),
            tags: Sequelize.TEXT,
            updatedAt: Sequelize.STRING(30),
            user: Sequelize.STRING(50)
        },{
            tableName: 'Collection',
            timestamps: false
        });
        var now = String(Date.now());
        try {
            var myCollection = await Collection.create({
                name: new Buffer(ctx.request.body.name).toString('base64'),
                href: new Buffer(ctx.request.body.href).toString('base64'),
                class: ctx.request.body.class,
                tags: ctx.request.body.tags,
                updatedAt: now,
                user: ctx.request.body.user
            });
        } catch (err) {
            ctx.response.set('Access-Control-Allow-Origin','*');
            ctx.response.type = 'application/json';
            ctx.response.body = {
                info: 'collect failed!',
                error: err
            };
            return;
        }
        ctx.response.set('Access-Control-Allow-Origin','*');
        ctx.response.type = 'application/json';
        ctx.response.body = {
            info: 'collect successed!',
            error: ''
        };
    },

    'GET /api/collect': async (ctx, next) => {
        const querystring = require('querystring');
        if (ctx.request.querystring) {
            var myUser = querystring.parse(ctx.request.querystring).user;
        }
        var myItems = [];
        var Collection = sequelize.define('cl', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            name: Sequelize.TEXT,
            href: Sequelize.TEXT,
            class: Sequelize.STRING(255),
            tags: Sequelize.TEXT,
            updatedAt: Sequelize.STRING(30)
        },{
            tableName: 'Collection',
            timestamps: false
        });

        try {
            var items = await Collection.findAll({
                where: {
                    user: myUser
                }
            });
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
            var href = new Buffer(item.href, 'base64').toString();
            let obj = {
                'id': item.id,
                'name': name,
                'href': href,
                'class': item.class,
                'tags': item.tags,
                'updatedAt': item.updatedAt
            };
            myItems.push(obj);
        }         
        ctx.response.set('Access-Control-Allow-Origin','*');
        ctx.response.type = 'application/json';
        ctx.response.body = {
            items: myItems,
            error: ''
        };
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
