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
		let keys = ['project_id', 'ua', 'url', 'projectType', 'title', 'screenSize', 'referer', 'host', 'env', 'msg', 'rowNum', 'colNum', 'level'];
		let values = [];
		let data = [];
		keys.forEach((item) => {
			values.push('?')
			data.push(config[item]);
		})

		let sql = `insert into error (${keys.join(',')}) values (${keys.join(',')})`;
		let result = await dbUtils.query( sql, data )
		return result
	}
}