import dbUtils  from './../utils/db-util'
import md5  from './../utils/util'
import timeUtils  from './../utils/datetime'
export default {
  async getError(config = {}) {
    let param = [],
      data = [],
      order = 'ORDER BY createTime DESC',
      limit = '';
    if (config.startTime) {
      param.push(`createTime >= ?`);
      data.push(config.startTime);
    }
    if (config.endTime) {
      param.push(`createTime <= ?`);
      data.push(config.endTime)
    }
    if (config.projectId) {
      param.push(`projectId = ?`);
      data.push(config.projectId)
    }
    if (config.dealState) {
      param.push(`dealState = ?`);
      data.push(config.dealState)
    }
    if (param.length > 0) {
      param = param.join(' and ');
      param = 'where ' + param;
    }
    if (config.sortBy) {
      order = config.sortBy == 1 ? 'ORDER BY createTime' : order;
    }

    if (config.pageSize && config.pageNum) {
      const size = parseInt(config.pageSize);
      const limitSize = (parseInt(config.pageNum - 1)) * size;
      data.push(limitSize);
      data.push(size);
      limit = 'LIMIT ?,?';
    }
    try {
      let sql = `select * from error ${param} ${order} ${limit}`;
      let result = await dbUtils.query(sql, data);

      let sqlCount = `select count(*) as count from error ${param}  `;
      let countData = await dbUtils.query(sqlCount, data);
      return {
        data: result,
        count: countData
      };
    } catch (ex) {
      return ex;
    }

  },

  async getErrorByTime(config = {}){
    let param = [],
        data = [],
        group = "GROUP BY  DATE_FORMAT(createTime,'%Y-%m-%d %H:%i')";
    if (config.startTime) {
      param.push(`createTime >= ?`);
      data.push(config.startTime);
    }
    if (config.endTime) {
      param.push(`createTime <= ?`);
      data.push(config.endTime)
    }
    if (config.projectId) {
      param.push(`projectId = ?`);
      data.push(config.projectId)
    }
    if (config.dealState) {
      param.push(`dealState = ?`);
      data.push(config.dealState)
    }
    if (config.timeType && config.timeType == 2) {
      group = "GROUP BY  DATE_FORMAT(createTime,'%Y-%m-%d')"
    }
    if (param.length > 0) {
      param = param.join(' and ');
      param = 'where ' + param;
    }
    try {
      let sql = `SELECT COUNT(*) as count, createTime FROM error ${param} ${group}`;
      let result = await dbUtils.query(sql, data);
      console.log(sql);
      return result;
    }  catch (ex) {
      return ex
    }

  },
  /*
    插入错误信息
  */
  async insertError(config = {}) {
    let keys = ['projectId', 'ua', 'targetUrl', 'projectType', 'title', 'host', 'screenSize', 'referer', 'msg', 'rowNum', 'colNum', 'level', 'breadcrumbs', 'currentIp', 'dealState'];
    let values = [];
    let data = [];

    keys.forEach((item) => {
      values.push('?');
      data.push(JSON.stringify(config[item]));
    });
    let sql = `insert into error (${keys.join(',')}) values (${data.join(',')})`;
    let result = await dbUtils.query(sql, data);
    return result
  },
  async getExistDeal(err_msg){
    let md5_err_msg=md5.util.md5(err_msg);
    let sql = `select 1 from error_deal e where e.key = ? limit 1`;
    let result = await dbUtils.query( sql, [md5_err_msg] )
    if(Array.isArray(result) && result.length > 0 ) {
      result = true
    } else {
      result = null
    }
    return result;
  },
  async insertDeal(config={}){
    let md5_key=md5.util.md5(config.key);
    let data=[md5_key,config.user,config.reason||'',timeUtils.getNowDatetime()]
    let sql = `insert into error_deal (\`key\`,\`user\`,reason,updatetime) values (?,?,?,?)`;
    let result = await dbUtils.query( sql,data)
    // if(Array.isArray(result) && result.length > 0 ) {
    //   result = true
    // } else {
    //   result = null
    // }
    return result;
  },
  async updateState(config = {}) {
	  let data=[];
	  let state=config.state;
    let sql=[`UPDATE error SET dealState = CASE id `];
    data=config.id;
    console.log(data);
    data.forEach(item=>{
      sql.push(`when ? then ${state}`);
    })
    sql.push(`end WHERE id IN (${data})`);
    console.log(sql);
    let result = await dbUtils.query( sql.join(' '), data )
    return result;
  },
  async updateReason(config = {}){
    let data=[config.reason,config.key];
    let sql=`update error_deal as e set reason = ? where e.key = ?`;
    let result = await dbUtils.query( sql, data );
    return result;
  }
}