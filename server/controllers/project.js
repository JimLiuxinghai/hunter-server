import projectModal from '../models/project';
import Tips from '../utils/tips';
import { util } from '../utils/util';

export default {
	async get (ctx) {
		let param = ctx.query;
		let proRes = await projectModal.getPro(param);
		let data = Tips.ERR_OK;
		data.data = proRes;
		ctx.body = data;
	},
	async insert (ctx) {
		let session = ctx.session;
		let param = ctx.request.body;
		param.projectId = util.md5(param.project + session.userid);
		let mapParam = {
			userid: session.userid,
			projectId: param.projectId
		}
		let proRes = await projectModal.insertPro(param);
		let mapRes = await projectModal.map(mapParam);
		console.log(proRes, mapRes)
		let data = Tips.ERR_OK;
		ctx.body = data;
	},
	async name (ctx) {
		let session = ctx.session;
		let param = ctx.query;
		console.log(param, 'params')
		let projectId = util.md5(param.project + session.userid);
		let config = {
			projectId: projectId
		}
		let proRes = await projectModal.hasProject(config)
		console.log(proRes)
		let data = Tips.ERR_OK;
		ctx.body = data;
	}
}