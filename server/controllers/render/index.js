module.exports = async ( ctx ) => {
  const title = 'home'
  const userName = ctx.session.userName
  await ctx.render('index', {
    title,
    userName
  })
}