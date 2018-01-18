const dbUtils = require('./../utils/db-util')

const user = {

  /**
   * 数据库创建用户
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  async create ( model ) {
    let sql = `insert into user (email, username, passwd, userid) values (?, ?, ?, ?)`
    let data = [model.email, model.name, model.password, model.userid]
    let result = await dbUtils.query( sql, data )
    return result
  },

  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getExistOne(options ) {
    let _sql = `
    SELECT * from user
      where email=? or username=?
      limit 1`
    let data = [options.email, options.name]
    let result = await dbUtils.query( _sql, data )
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 根据用户名和密码查找用户
   * @param  {object} options 用户名密码对象
   * @return {object|null}         查找结果
   */
  async getOneByUserNameAndPassword( options ) {
    console.log(options, 'option')
    let _sql = `
    SELECT * from user
      where passwd=? and username=?
      limit 1`
    let data = [options.password, options.name]
    let result = await dbUtils.query( _sql, data )
    
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

  /**
   * 根据用户名查找用户信息
   * @param  {string} userName 用户账号名称
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserName( userName ) {
    let result = await dbUtils.select(
      'user',
      ['id', 'email', 'name', 'create_time'])
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },



}


module.exports = user
