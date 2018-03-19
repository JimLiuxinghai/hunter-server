import errorModal from '../../models/error';
import fs from 'fs';
import path from 'path'
import Tips from '../../utils/tips';
import userCode from '../../codes/user';
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
  /*
   获取每个时间段下bug数量
   method: get
   param = {
   projectId: '123' //项目id,
   startTime: '2018-03-01 13:57', //开始时间
   endTime: '2018-03-01 13:57',   //结束时间
   dealState: 2                   //bug状态 1未处理 2已解决
   timeType：1                    //1按分钟分组，2 按天分组
   }
   success = {
   count: 1          //bug数量
   timestamp:2018-02-28 09:57:00      //出现bug的时间
   }
   */
  async getErrorByTime(ctx) {
    let param = ctx.query;
    try {
      let proRes = await errorModal.getErrorByTime(param);
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
		let errorList = ctx.query.err_msg.split('|');
		let result = [];
		const allip = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
		let ips = allip.split(':');
		const currentIp = ips[ips.length - 1];
		errorList.forEach(async (error) => {
			let parseError = JSON.parse(error);
			parseError.ua = ua;
			parseError.currentIp = currentIp;
      parseError.dealState = 1;
			let modalRes = await errorModal.insertError(parseError);
		});

		let image = fs.readFileSync(path.join(__dirname , '../../codes/error.gif'));
		ctx.type = 'image/gif';
		ctx.status = 200;
        ctx.length = Buffer.byteLength(image);
        ctx.body = new Buffer(image);
	},
  /*
  * 查看错误处理是否存在
  * params: err_msg  错误详情
  * @return true 存在 null 不存在
  * */
	async getExistDeal(ctx){
    let err_msg=ctx.query.err_msg;
    try{
      let modalRes = await errorModal.getExistDeal(err_msg);
      ctx.body=modalRes;
    }catch (ex){
      let data = Tips.ERR_SYSTEM_ERROR;
      data.data = ex;
      ctx.body = data;
    }

  },
  /*
    插入处理状态数据
  * params: err_msg  错误详情
  * @return success : true 成功 null 失败
  * */
  async insertDeal(ctx){
    let result = {
      success: false,
      message: '',
      data: null
    }
    let queryObj=ctx.query;
    let param={
      key:queryObj.err_msg,
      user:ctx.session.userName||''
    };
    try{
      let modalRes = await errorModal.insertDeal(param);
      if ( modalRes && modalRes.insertId * 1 > 0) {
        result.success = true
      } else {
        result.success = false;
      }
      ctx.body=result;
    }catch (ex){
      let data = Tips.ERR_SYSTEM_ERROR;
      data.data = ex;
      ctx.body = data;
    }
  },


  /**
   * 更新处理状态
   * @param   err_id 错误id （批量多条以逗号拼接）eg:2,3,5
   * @return  success : true 成功 null 失败
   */
  async updateState(ctx){
	    let ids=ctx.query.err_id;
      let result = {
        success: false,
        message: ''
      }
      let params={
        id:ids.split((ids.indexOf(',')?',':'')),
        state:ctx.query.state
     };
     try{
       let updateRes = await errorModal.updateState(params);
       if(updateRes.changedRows>0){
         result.success=true;
       }else{
         result.success=null;
       }
       ctx.body=result;
     }catch(ex){
       let data = Tips.ERR_SYSTEM_ERROR;
       data.data = ex;
       ctx.body = data;
     }
  },
  /**
   * 更新处理原因
   * @param  err_msg 错误详情   reason 原因内容
   * @return success : true 成功 null 失败
   */
  async updateReason(ctx){
    let queryObj=ctx.query;
    let result = {
      success: false,
      message: ''
    }
    let params={
      key:queryObj.err_msg,
      reason:queryObj.reason
    };
    try {
      let updateRes = await errorModal.updateReason(params);
      if(updateRes.changedRows>0){
        result.success=true;
      }else{
        result.success=null;
        result.message=userCode.ERROR_SYS;
      }
      ctx.body=result;
    }catch (ex){
      let data = Tips.ERR_SYSTEM_ERROR;
      data.data = ex;
      ctx.body = data;
    }
  }
}