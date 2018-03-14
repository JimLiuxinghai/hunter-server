module.exports = {

  async indexPage ( ctx ) {
  	const userName = ctx.session.userName;
    const title = '未解决错误';
    await ctx.render('undeal', {
      title,
      userName
    })
  },

};