/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userInfoController = require('./../controllers/user-info')

import errorController from './../controllers/get-error'

const routers = router
  .get('/user/getUserInfo', userInfoController.getLoginUserInfo)
  .post('/user/signIn.json', userInfoController.signIn)
  .post('/user/signUp.json', userInfoController.signUp)
  
  .get('/errorList', errorController.get)
  .get('/error.gif', errorController.insert)
 
  
module.exports = routers
