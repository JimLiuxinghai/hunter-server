module.exports = {

  async indexPage ( ctx ) {
    const userName = ctx.session.userName;
    const title = '实时监控';
    const rName = 'errorMonitor';
    await ctx.render('error', {
      title,
      userName,
      rName
    })
  },

};
