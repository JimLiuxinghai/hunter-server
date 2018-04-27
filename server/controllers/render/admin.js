module.exports = {

  async indexPage ( ctx ) {
  	let session = ctx.session;
    const title = 'admin page';
    const userName = ctx.session.userName;
    const rName = 'index';
    await ctx.render('admin', {
      title,
      rName
    })
  },

}