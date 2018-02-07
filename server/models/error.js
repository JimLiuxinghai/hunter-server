import dbUtils  from './../utils/db-util'
export default {
	async getError(config = {}) {
		let param = [];
		let data = [];
		if(config.start) {
			param.push(``)
			data.push()
		}
		param.join(' ');
		let sql = `select * from error where ${param}`
		let result = await dbUtils.query( sql, data )
		return result
	},
	
	async insertError(config = {}) {
		let keys = ['project_id', 'ua', 'targetUrl', 'projectType', 'title', 'host', 'screenSize', 'referer', 'msg', 'rowNum', 'colNum', 'level', 'breadcrumbs', 'currentIp'];
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