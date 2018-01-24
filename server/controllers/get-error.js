import errorModal from '../models/error';
import fs from 'fs';
import path from 'path'
export default {
	async get(ctx) {

	},
	async insert(ctx) {


		console.log(ctx.query.err_msg)
		let error = ctx.query.err_msg.split('|')
		console.log(error)
		let image = fs.readFileSync(path.join(__dirname , '../codes/error.gif'))

		ctx.type = 'image/gif'

		ctx.status = 200

        ctx.length = Buffer.byteLength(image)
        
        ctx.body = new Buffer(image);
	}
}