function log( ctx ) {
	let session = ctx.session
    if( !session || !session.isLogin === true  ) {
  		ctx.redirect('/login');
    }
}

module.exports = async (ctx, next) => {
	log(ctx);
	return next()
}