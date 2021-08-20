//import Koa from 'koa';
// import bodyParser from 'koa-bodyparser';
// import Router from 'koa-router';
// import json from 'koa-json';
// import path from 'path';
// import render from 'koa-ejs';
const Koa = require("koa");
const KoaRouter = require("koa-router");
const json = require("koa-json");
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
//const { Console } = require("console");

const app = new Koa();
const router = new KoaRouter();

//replace db
const things = ['My Family', 'Programming' , 'Music'];


//JSON PRETTIER
app.use(json());

//bodyParser middleware
app.use(bodyParser());

// render the app
render(app, {
    root: path.join(__dirname,'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
})

//routes
router.get('/', inde);
router.get('/add', showAdd);
router.post('/add', add);

//index fn
async function inde(ctx) {
    await ctx.render('index',{
        title: 'Things I love:',
        things: things
    });
}

//sjowAdd fn
async function showAdd(ctx){
    await ctx.render('add', {
        title: 'Add Things'
    });
}

//add fn
async function add(ctx){

    const body = ctx.request.body;
    console.log(ctx.request.body);
    if (typeof body === 'undefined'){
        console.log("heloo");
        ctx.status = 400;
        return ctx.status;
    } else
    things.push(body.thing);
    ctx.redirect('/');


}


//rendering a view called index
// router.get('/', async ctx => {
//     await ctx.render('index',{
//         title: 'Things I love:',
//         things: things
//     });
// });
//simple middleware exapmle
//app.use(async (ctx) => (ctx.body = { msg: "hello world" }));



//router examples
router.get("/", ctx => (ctx.body = {msg: "starting page"}));
router.get("/test", ctx => (ctx.body = {msg: "this is test"}));

//router middleware
app.use(router.routes()).use(router.allowedMethods());
//port listening 
app.listen(3000, () => console.log("server started ..."));
