/**
 * 错误页面子路由
 */

const router = require('koa-router')();
const controller = require('./../controllers/render/error')
const auth = require('../services/auth');

const routers = router
  .get('/', auth, controller.indexPage);

module.exports = routers;