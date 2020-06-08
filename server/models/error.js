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
        group = "GROUP BY  DATE_FORMAT(createTime,'%Y-%m-%d %h:%m:%s')";
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
      data.push(config[item] ? JSON.stringify(config[item]) : 0);
    });
    let sql = `insert into error (${keys.join(',')}) values (${data.join(',')})`;
    console.log(sql)
    let result = await dbUtils.query(sql, data);
    return result
  },
  /**
   * errorDetail
   * @param {*} config = {
   *    id
   * } 
   */
  async errorDetail (config = {}) {
    let param = [`id = ?`]
    let data = [config.id];
    if (param.length > 0) {
      param = param.join(' and ');
      param = 'where ' + param;
    }
    let sql = `select * from error ${param}`;
    let result = await dbUtils.query(sql, data);
  },
  /**
   * 获取未处理错误
   * @param config
   * @returns {Promise.<*>}
   */
  async getExistDeal(config = {}){
    let param = [],
      data = [],
      limit = '';
    if (param.length > 0) {
      param = param.join(' and ');
      param = 'where ' + param;
    }
    if (config.pageSize && config.pageNum) {
      const size = parseInt(config.pageSize);
      const limitSize = (parseInt(config.pageNum - 1)) * size;
      data.push(limitSize);
      data.push(size);
      limit = 'LIMIT ?,?';
    }

    try {
      let sql = 'select * from error where dealState = 1 ' + limit;
      let result = await dbUtils.query(sql, data);

      let sqlCount = `select count(*) as count from error where dealState = 1 `;
      let countData = await dbUtils.query(sqlCount, data);
      return {
        data: result,
        count: countData
      };
    } catch (ex) {
      return ex;
    }
  },

  /**
   * 添加处理人和原因
   * @param config
   * @returns {Promise.<*>}
   */
  async insertDeal(config = {}){
    let key = md5.util.md5(config.key);
    let keys = ['`key`','`user`','reason'];
    let values = [];
    let data = [];

    keys.forEach((item) => {
      values.push('?');
      if(item === '`key`'){
        data.push(JSON.stringify(key));
      } else if(item === '`user`'){
        data.push(JSON.stringify(config['user']));
      } else {
        data.push(JSON.stringify(config[item]));
      }
    });

    let sql = `insert into error_deal (${keys.join(',')}) values (${data.join(',')})`;

    let result = await dbUtils.query(sql, data);
    return result;
  },

  /**
   * 更新处理状态
   * @param config
   * @returns {Promise.<*>}
   */
  async updateState(config = {}) {
	  let data = [];

    try {
      let sql = `UPDATE error SET dealState = 2  WHERE id = ${config.err_id}`;
      let result = await dbUtils.query( sql, data );
      return {
        data: result
      };
    } catch (ex) {
      return ex;
    }
  },
  async updateReason(config = {}){
    let data=[config.reason,config.key];
    let sql=`update error_deal as e set reason = ? where e.key = ?`;
    let result = await dbUtils.query( sql, data );
    return result;
  }
}