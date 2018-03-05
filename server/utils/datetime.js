const monthEnum = [
  '01', '02', '03', '04', '05', '06',
  '07', '08', '09', '10', '11', '12',
];

const dayEnum = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
  '21', '22', '23', '04', '25', '26', '27', '28', '29', '30', '31',
];

const timeEnum = [
  '00',
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
  '21', '22', '23', '04', '25', '26', '27', '28', '29', '30',
  '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
  '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
  '51', '52', '53', '54', '55', '56', '57', '58', '59',
];

const datatime = {

    parseStampToFormat(timestamp, type) {
        let _date;
        if (timestamp) {
          _date = new Date(timestamp)
        } else {
          _date = new Date()
        }

        let parsedDate;
        let parseTime;
        let parseDatetime;

        let yearNum = _date.getFullYear();
        let monthNum = monthEnum[_date.getMonth()];
        let dayNum = dayEnum[_date.getDate() - 1];
        let hourNum = timeEnum[_date.getHours()];
        let minNum = timeEnum[_date.getMinutes()];
        let secNum = timeEnum[_date.getSeconds()];

        type = type || 'YYYY-MM-DD hh:mm:ss'

        parseDatetime = type
          .replace('YYYY', yearNum)
          .replace('MM', monthNum)
          .replace('DD', dayNum)
          .replace('hh', hourNum)
          .replace('mm', minNum)
          .replace('ss', secNum);

        return parseDatetime
    },

    getNowDatetime() {
        let timestamp = new Date().getTime();
        let nowDatetime = this.parseStampToFormat(timestamp);
        return nowDatetime
    },
    /**
    * 切换日期
    * @param date {String} 2016-08-01
    * @param num {Number} 等于 0 当天
    *                       大于0  例如为1时 2016-07-31
    *                      小于0  例如为-1时 2016-08-02
    * */
    switchDate (date, num) {
        let thisTime = new Date(date).getTime();
        let lastTime = new Date(thisTime - (num * 86400000));
        let lastYear = lastTime.getFullYear();
        let lastMonth = (lastTime.getMonth() + 1) < 10 ? '0' + (lastTime.getMonth() + 1) : (lastTime.getMonth() + 1);
        let lastDay = lastTime.getDate() < 10 ? '0' + lastTime.getDate() : lastTime.getDate();
        let lastHour = lastTime.getHours() < 10 ? '0' + lastTime.getHours() : lastTime.getHours();
        let lastMin = lastTime.getMinutes() < 10 ? '0' + lastTime.getMinutes() : lastTime.getMinutes();
        let lastDate = lastYear + '-' + lastMonth + '-' + lastDay + ' ' + lastHour + ':' + lastMin;
        return lastDate;
    },
    /** 计算时间相差天数 可有负数
    * @param start 开始时间
    * @param end 结束时间
    * return end-start  相差天数
    * */
    getDiffByDay: function (start, end) {
        let start_date = this.parseDate(start);
        let end_date = this.parseDate(end);
        let d_value = end_date - start_date;
        return Math.floor(d_value / 1000 / 60 / 60 / 24);
    },


};

module.exports = datatime;