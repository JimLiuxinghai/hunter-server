/**
 * 管理员用户子路由
 */

const router = require('koa-router')()
const admin = require('./../controllers/admin')
const auth = require('../services/auth')

module.exports = router.get( '/', auth, admin.indexPage )