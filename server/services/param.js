/**
 * 错误处理页面参数处理
 */
const dateTime = require('../utils/datetime');

const paramMan = {
  /**
   * 根据传入的类型获取对应的时间段
   * @param  Number num  时间类型 [0,1,2,3,4,5]
   * @return [startTime, endTime]     返回的时间段
   */
  getTimeSlot(date, num) {
      let typeArr = [0.041, 1, 7, 30, 90];
      let startTime = date,
          endTime = null;
      if (typeof num == "number") {
        endTime = dateTime.switchDate(date, typeArr[num]);
        return [startTime, endTime]
      }
      
  }

};

module.exports = paramMan;
