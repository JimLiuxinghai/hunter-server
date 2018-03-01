import errorModal from '../models/error';
import fs from 'fs';
import path from 'path'
import Tips from '../utils/tips';
export default {
  /*
   获取bug详情
   method: get
   param = {
     projectId: '123' //项目id,
     startTime: '2018-03-01 13:57', //开始时间
     endTime: '2018-03-01 13:57',   //结束时间
     pageSize: 20                   //每页多少条
     pageNum: 1                     //第几页
     dealState: 2                   //bug状态 1未处理 2已解决
     sortBy：1                      //2 按错误时间倒序，1 正
   }
   */
	async get(ctx) {
		let param = ctx.query;
    param.pageNum = param.pageNum || 1;
    param.pageSize = param.pageSize || 20;
		try {
      let proRes = await errorModal.getError(param);
      let data = Tips.ERR_OK;
      data.data = proRes;
      ctx.body = data;
    } catch (ex) {
		  let data = Tips.ERR_SYSTEM_ERROR;
		  data.data = ex;
		  ctx.body = data;
    }

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
			let parseError = JSON.parse(error);
			parseError.ua = ua;
			parseError.host = host;
			parseError.currentIp = currentIp;
			let modalRes = await errorModal.insertError(parseError);
		});

		let image = fs.readFileSync(path.join(__dirname , '../codes/error.gif'));
		ctx.type = 'image/gif';
		ctx.status = 200;
        ctx.length = Buffer.byteLength(image);
        ctx.body = new Buffer(image);
	}
}