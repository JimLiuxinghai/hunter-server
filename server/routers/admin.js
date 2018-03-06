/**
 * 管理员用户子路由
 */

const router = require('koa-router')()
const admin = require('./../controllers/render/admin')

module.exports = router.get( '/', admin.indexPage )