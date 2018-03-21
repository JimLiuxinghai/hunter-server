import errorModal from '../../models/error';
import fs from 'fs';
import path from 'path'
import Tips from '../../utils/tips';
import datetime from '../../utils/datetime';
import userCode from '../../codes/user';


const getUsers = (list) => {
    let users = []
    list.forEach((item) => {
        if(users.indexOf(item.currentIp) == -1) {
            users.push(item.currentIp)
        }
    })
    return users.length
}

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
  /*
   * 分天显示错误数量
   * method: get
   * param = {
        prokectId: '123',
        startTime: '2018-03-01', //开始时间
        endTime: '2018-03-02'
     }
  */
  async getErrCount (ctx) {
    let param = ctx.query;
    let dateArr = datetime.filterWeek([param.startTime, param.endTime])
    try {
        let errRes = await errorModal.getErrorByTime(param);
        let newData = [];
        dateArr.forEach((date) => {
            let data = {
                time: date,
                count: 0
            }
            errRes.forEach((err) => {
                if(date == datetime.parseStampToFormat(err.createTime)) {
                    data.count += err.count
                }
            })
            newData.push(data)
        })
        
        let data = Tips.ERR_OK;
        data.data = newData;
        ctx.body = data;
    }
    catch(e) {
        let data = Tips.ERR_SYSTEM_ERROR;
        data.data = e;
        ctx.body = data;
    }
  },


  /*
  * bug影响用户数量
  * method: get
  * param = {
       projectId: '123' //项目id,
       startTime: '2018-03-01', //开始时间
       endTime: '2018-03-01',   //结束时间
    }
  */
  async errorUser (ctx) {
     let param = ctx.query;
     try {
        let errRes = await errorModal.getError(param);
        let users = getUsers(errRes.data)
        let data = Tips.ERR_OK;
        data.data = {
            users: users
        };
        ctx.body = data;

     } catch (e) {
        let data = Tips.ERR_SYSTEM_ERROR;
        data.data = e;
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
   * @param   err_id 错误id
   * @return  success : true 成功 null 失败
   */
  async updateState(ctx){
	    let params = ctx.request.body;
     try {
       let updateRes = await errorModal.updateState(params);
       let data = Tips.ERR_OK;
       ctx.body = data;
     } catch(ex){
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