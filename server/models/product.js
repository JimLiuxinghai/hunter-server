import dbUtils  from './../utils/db-util'
export default {
	async getPro(config = {}) {
		let param = [];
		let data = [];
		if(config.pro_id) {
			param.push(`projectId = ?`)
			data.push(config.pro_id)
		}
		if (param.length > 0) {
			param.unshift('where')
		}
		param.join(' ');
		let sql = `select * from error ${param}`
		let result = await dbUtils.query( sql, data )
		return result
	},
	
	async insertError(config = {}) {
		let keys = ['projectId', 'ua', 'targetUrl', 'projectType', 'title', 'host', 'screenSize', 'referer', 'msg', 'rowNum', 'colNum', 'level', 'breadcrumbs', 'currentIp'];
		let values = [];
		let data = [];

		keys.forEach((item) => {
			values.push('?')
			data.push(JSON.stringify(config[item]));
		})
		let sql = `insert into error (${keys.join(',')}) values (${data.join(',')})`;
		console.log(sql)
		let result = await dbUtils.query( sql, data )
		return result
	}
}