import projectModal from '../models/project';
import Tips from '../utils/tips';
import utils from '../utils/util';

export default {
	async get(ctx) {
		let param = ctx.query;
		let proRes = await projectModal.getPro(param)
		let data = Tips.ERR_OK;
		data.data = proRes;
		ctx.body = data;
	},
	async insert(ctx) {
		let session = ctx.session
		let param = ctx.request.body
		param.projectId = utils.util.md5(param.project + param.projectType + session.userid)
	}
}