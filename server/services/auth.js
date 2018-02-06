function log( ctx ) {
	let session = ctx.session
	console.log(session)
    if( !session || !session.isLogin === true  ) {
  		ctx.redirect('/login');
    }
    console.log( ctx.method, ctx.header.host + ctx.url, '中间件信息' )
}

module.exports = async (ctx, next) => {
	log(ctx);
	return next()
}