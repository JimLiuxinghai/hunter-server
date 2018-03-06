module.exports = {

  async indexPage ( ctx ) {
  	const userName = ctx.session.userName
    const title = 'project'
    await ctx.render('project', {
      title,
      userName
    })
  },

}