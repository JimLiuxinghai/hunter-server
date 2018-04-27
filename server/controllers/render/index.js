module.exports = async ( ctx ) => {
  const title = 'home';
  const userName = ctx.session.userName;
  const rName='index';
  await ctx.render('index', {
    title,
    userName,
    rName
  })
};