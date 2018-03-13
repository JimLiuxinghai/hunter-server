import projectModal from '../../models/project';
import Tips from '../../utils/tips';
import { util } from '../../utils/util';

export default {
	async get (ctx) {
		let param = ctx.query;
		try {
			let proRes = await projectModal.getPro(param);
			let data = Tips.ERR_OK;
			data.data = proRes;
			ctx.body = data;
		}
		catch (err) {
			let data = Tips.ERR_SYSTEM_ERROR;
			data.data = err;
			ctx.body = data;
		}
		
	},
	async insert (ctx) {
		let session = ctx.session;
		let param = ctx.request.body;
		param.projectId = util.md5(param.project + session.userid);
		let mapParam = {
			userid: session.userid,
			projectId: param.projectId
		}
		try {
			let proRes = await projectModal.insertPro(param);
			let mapRes = await projectModal.map(mapParam);
			let data = Tips.ERR_OK;
			data.data = {
				projectId: param.projectId
			}
			ctx.body = data;
		}
		catch (err) {
			let data = Tips.ERR_SYSTEM_ERROR;
			data.data = err;
			ctx.body = data;
		}
	},
	/*
		检查该用户下项目名是否重复
		method: get
		param = {
			project: '123' //项目名
		}
	*/
	async name (ctx) {
		let session = ctx.session;
		let param = ctx.query;
		let projectId = util.md5(param.project + session.userid);
		let config = {
			projectId: projectId
		}
		try {
			let proRes = await projectModal.hasProject(config)
			
			let data = null
			console.log(proRes)
			proRes.length > 0 ? data = Tips.ERR_HAS_NAME : data = Tips.ERR_OK;
			ctx.body = data;
		}
		catch (err) {
			let data = Tips.ERR_SYSTEM_ERROR;
			data.data = err;
			ctx.body = data;
		}
		
	},
	/*
		项目添加用户
		method: 'POST'
		param = {
			userid: '123',
			projectId: '123'
		}
	*/
	async addUser (ctx) {
		let param = ctx.request.body;
		try {
			let mapRes = await projectModal.map(param);
			let data = Tips.ERR_OK;
			ctx.body = data;
		}
		catch (err) {
			let data = Tips.ERR_SYSTEM_ERROR;
			data.data = err;
			ctx.body = data;
		}
	}
}