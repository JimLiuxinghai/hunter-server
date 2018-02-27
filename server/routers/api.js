/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userInfoController = require('./../controllers/user-info')

import errorController from './../controllers/get-error'
import proController from './../controllers/product'


const routers = router
  .get('/user/getUserInfo', userInfoController.getLoginUserInfo)
  .post('/user/signIn.json', userInfoController.signIn)
  .post('/user/signUp.json', userInfoController.signUp)
  //错误处理
  .get('/errorList', errorController.get)
  .get('/error.gif', errorController.insert)
  //项目管理
  .get('/product', proController.get)
  
module.exports = routers
