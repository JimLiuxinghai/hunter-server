/**
 * 主页子路由
 */

const router = require('koa-router')()
const index = require('../controllers/render/index')
const auth = require('../services/auth')

module.exports = router
  .get('/', auth, index)
