import dbUtils  from './../utils/db-util'
export default {
  async getError(config = {}) {
    let param = [],
        data = [],
        order = 'ORDER BY timestamp DESC',
        limit = '';
    if (config.startTime) {
      param.push(`timestamp >= ?`);
      data.push(config.startTime);
    }
    if (config.endTime) {
      param.push(`timestamp <= ?`);
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
      order = config.sortBy == 1 ? 'ORDER BY timestamp' : order;
    }

    if (config.pageSize && config.pageNum) {
      const size =  parseInt(config.pageSize);
      const limitSize = (parseInt(config.pageNum -1)) * size;
      data.push(limitSize);
      data.push(size);
      limit = 'LIMIT ?,?';
    }

    let sql = `select * from error ${param} ${order} ${limit}`;
    let result = await dbUtils.query(sql, data);
    return result;
  },

  async insertError(config = {}) {
    let keys = ['projectId', 'ua', 'targetUrl', 'projectType', 'title', 'host', 'screenSize', 'referer', 'msg', 'rowNum', 'colNum', 'level', 'breadcrumbs', 'currentIp'];
    let values = [];
    let data = [];

    keys.forEach((item) => {
      values.push('?');
      data.push(JSON.stringify(config[item]));
    });
    let sql = `insert into error (${keys.join(',')}) values (${data.join(',')})`;
    let result = await dbUtils.query(sql, data);
    return result
  }
}