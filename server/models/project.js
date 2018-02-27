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
		let sql = `select * from project_info ${param}`
		let result = await dbUtils.query( sql, data )
		return result
	},
	
	async insertPro(config = {}) {
		let keys = ['project', 'projectId', 'projectInfo', 'projectType']
		let values = [];
		let data = [];

		keys.forEach((item) => {
			values.push('?')
			data.push(JSON.stringify(config[item]));
		})
		let sql = `insert into project_info (${keys.join(',')}) values (${data.join(',')})`;
		console.log(sql)
		let result = await dbUtils.query( sql, data )
		return result
	}
}