import path from 'path'
import Koa from 'koa'
import convert from 'koa-convert'
import views from 'koa-views'

import render from 'koa-ejs'
import koaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
import koaLogger from 'koa-logger'
import session from 'koa-session-minimal'
import MysqlStore from 'koa-mysql-session'

import config  from './../config/env/config'
import routers from './routers/index'
const app = new Koa()

// session存储配置
const sessionMysqlConfig= {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
}

//配置cookie

let cookie = {
  maxAge: 60 * 60 * 1000 * 24 * 30, // cookie有效时长
  expires: '',  // cookie失效时间
  path: '/', // 写cookie所在的路径
  domain: '', // 写cookie所在的域名
  httpOnly: '', // 是否只用于http请求中获取
  overwrite: false,  // 是否允许重写
  secure: '',
  sameSite: '',
  signed: ''
}

// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig),
  cookie: cookie
}))

// 配置控制台日志中间件
app.use(convert(koaLogger()))

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(convert(koaStatic(
  path.join(__dirname , './../static')
)))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen( config.port )
console.log(`the server is start at port ${config.port}`)
