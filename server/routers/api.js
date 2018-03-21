/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userInfoController = require('./../controllers/api/user-info')

import errorController from './../controllers/api/get-error'
import proController from './../controllers/api/project'


const routers = router
  .get('/user/getUserInfo', userInfoController.getLoginUserInfo)
  .post('/user/signIn.json', userInfoController.signIn)
  .post('/user/signUp.json', userInfoController.signUp)
  //概览
  .get('/getErrByDay', errorController.getErrCount)
  .get('/errorUser', errorController.errorUser)
  //错误处理
  .get('/errorList', errorController.get)
  .get('/errorByTime', errorController.getErrorByTime)
  .get('/getExistDeal',errorController.getExistDeal)
  .post('/insertDeal',errorController.insertDeal)
  .post('/updateState', errorController.updateState)
  .post('/updateReason',errorController.updateReason)
  //项目管理
  .get('/project/name', proController.name)
  .get('/project', proController.get)
  .post('/project', proController.insert)
  .get('/project/user', proController.getUser)
  //收集错误
  .get('/error.gif', errorController.insert)
  

module.exports = routers
