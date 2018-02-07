import errorModal from '../models/error';
import fs from 'fs';
import path from 'path'
export default {
	async get(ctx) {
		let param = ctx.query;
		
	},
	async insert(ctx) {
		let ua = ctx.request.header['user-agent'];
		let host = ctx.request.header['host'];
		let errorList = ctx.query.err_msg.split('|');
		let result = [];
		const allip = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
		let ips = allip.split(':');
		const currentIp = ips[ips.length - 1];
		errorList.forEach(async (error) => {
			let parseError = JSON.parse(error)
			parseError.ua = ua;
			parseError.host = host;
			parseError.currentIp = currentIp;
			let modalRes = await errorModal.insertError(parseError);
		})

		let image = fs.readFileSync(path.join(__dirname , '../codes/error.gif'))
		ctx.type = 'image/gif'
		ctx.status = 200
        ctx.length = Buffer.byteLength(image)
        ctx.body = new Buffer(image);
	}
}