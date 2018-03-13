/**
 * 工作台子路由
 */

const router = require('koa-router')();
const controller = require('./../controllers/render/undeal');
const auth = require('../services/auth');

const routers = router
  .get('/', auth, controller.indexPage);

module.exports = routers