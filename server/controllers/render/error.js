module.exports = {

  async indexPage ( ctx ) {
    const userName = ctx.session.userName
    const title = '实时监控'
    await ctx.render('error', {
      title,
      userName
    })
  },

};
