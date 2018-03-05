import dbUtils  from './../utils/db-util'
export default {
	async getPro(config = {}) {
		let param = [];
		let data = [];
		if(config.projectId) {
			param.push(`where projectId = ?`)
			data.push(config.projectId)
		}
		param.join(' ');
		let sql = `select * from project_info ${param}`
		let result = await dbUtils.query( sql, data )
		return result
	},
	//插入project
	async insertPro(config = {}) {
		let keys = ['project', 'projectId', 'projectInfo', 'projectType']
		let values = [];
		let data = [];

		keys.forEach((item) => {
			values.push('?')
			data.push([config[item]]);
		})
		let sql = `insert into project_info (${keys.join(',')}) values ( ? )`;
		console.log(sql)
		let result = await dbUtils.query( sql, data );
		return result;
	},
	//插入user_pro_map
	async map (config = {}) {
		let data = [config.userid, config.projectId]
		let sql = `insert into user_pro_map ( userid, projectId ) values (?, ?)`;
		let result = await dbUtils.query( sql, data );
		return result
	},
	//查询projectname是否存在
	async hasProject (config = {}) {
		let data = [config.projectId];
		let sql = `select * from project_info where projectId = ?`
		let result = await dbUtils.query( sql, data );
		return result;
	}

}