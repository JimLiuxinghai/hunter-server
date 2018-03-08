/**
 * 整合所有子路由
 */

const router = require('koa-router')();

const home = require('./home');
const api = require('./api');
const admin = require('./admin');
const project = require('./project');
const error = require('./error');

router.use('/', home.routes(), home.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
router.use('/login', admin.routes(), admin.allowedMethods());
router.use('/project', project.routes(), project.allowedMethods());
router.use('/errorMonitor', error.routes(), error.allowedMethods());
module.exports = router;


