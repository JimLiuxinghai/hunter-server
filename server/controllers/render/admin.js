module.exports = {

  async indexPage ( ctx ) {
  	let session = ctx.session
    const title = 'admin page'
    const userName = ctx.session.userName
    await ctx.render('admin', {
      title,
    })
  },

}