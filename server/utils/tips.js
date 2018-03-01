/**
 * Created by Administrator on 2017/9/1.
 * 提示信息
 */

exports.ERR_OK = {
    "status": {
        "code": 200,
        "msg": "OK"
    },
    "data": {}
};
// 100 系统级别错误
exports.ERR_SYSTEM_ERROR = {
    "status": {
        "code": 100,
        "msg": "系统错误"
    }
};
// 2000 参数错误
exports.ERR_LIVE_DATE = {
    "status": {
        "code": 2000,
        "msg": "请填写查询条件"
    }
};
// 2001 名字已存在
exports.ERR_HAS_NAME = {
    "status": {
        "code": 2001,
        "msg": "名字已存在"
    }
};