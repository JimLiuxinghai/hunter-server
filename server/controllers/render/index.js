module.exports = async ( ctx ) => {
  const title = '概览';
  const userName = ctx.session.userName;
  const rName='index';
  await ctx.render('index', {
    title,
    userName,
    rName
  })
};