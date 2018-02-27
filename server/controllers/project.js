import projectModal from '../models/project';
import Tips from '../utils/tips';
export default {
	async get(ctx) {
		let param = ctx.query;
		let proRes = await projectModal.getPro(param)
		let data = Tips.ERR_OK;
		data.data = proRes;
		ctx.body = data;
	},
	async insert(ctx) {
		
	}
}