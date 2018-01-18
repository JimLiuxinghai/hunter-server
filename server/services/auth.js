function log( ctx ) {
	console.log(ctx.session, 'session')
	//ctx.redirect('http://localhost:3000/www/123/456')
    console.log( ctx.method, ctx.header.host + ctx.url, '中间件信息' )
}

module.exports = async (ctx, next) => {
	log(ctx);
	return next()
}