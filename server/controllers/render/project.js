module.exports = {

  async indexPage ( ctx ) {
  	const userName = ctx.session.userName;
    const title = 'project';
    const rName='project';
    await ctx.render('project', {
      title,
      userName,
      rName
    })
  },

};