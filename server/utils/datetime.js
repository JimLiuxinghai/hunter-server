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

        type = type || 'YYYY-MM-DD'

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
    /**
     * 字符串转日期
     * @param str
     * @returns {Date}
     */
    strToDate: function (str) {
      let isoExp = /^\s*(\d{4})[-\/\u4e00-\u9fa5](\d\d?)[-\/\u4e00-\u9fa5](\d\d?)[\u4e00-\u9fa5]?\s*$/;
      let date = new Date();
      let month;
      let parts = isoExp.exec(str);
      if (parts) {
        month = +parts[2];
        date.setFullYear(parts[1], month - 1, parts[3]);
        date.setHours(0, 0, 0, 0);
        if (month != date.getMonth() + 1) {
          date.setTime(NaN);
        }
      }
      return date;
    },
    /**
     * 获取一个区间内，指定的周有那些天（例如：['2016-07-05', '2016-08-15']中周一那些天是周一）
     * @param dates {Array} 需要筛选的日期有那些, 如果type === 'section'，第一项是开始日期，第二项是结束日期
     * @param weeks {Array} 筛选的周有那些 [0,1,2,3,4,5,6]
     * @param type {String} 默认section
     * @returns {Array}
     */
    filterWeek: function (dates, weeks = [0, 1, 2, 3, 4, 5, 6], type = 'section') {
      let arr = [];
      if (type === 'section') {
        let startTime = datatime.strToDate(dates[0]);
        let endTime = datatime.strToDate(dates[1]);
        let currTime = startTime;
        while (currTime.getTime() <= endTime.getTime()) {
          let currYear = currTime.getFullYear();
          let currMonth = currTime.getMonth() + 1;
          if (currMonth < 10) {
            currMonth = `0${currMonth}`
          }
          let currDate = currTime.getDate();
          if (currDate < 10) {
            currDate = `0${currDate}`
          }
          let currWeek = currTime.getDay();

          for (let i = 0; i < weeks.length; i++) {
            if (currWeek == weeks[i]) {
              arr.push(`${currYear}-${currMonth}-${currDate}`);
              break;
            }
          }

          currTime.setDate(parseInt(currDate) + 1);

        }
      } else {
        dates.forEach((item) => {
          let currTime = datatime.strToDate(item);
          let currYear = currTime.getFullYear();
          let currMonth = currTime.getMonth() + 1;
          if (currMonth < 10) {
            currMonth = `0${currMonth}`
          }

          let currDate = currTime.getDate();
          if (currDate < 10) {
            currDate = `0${currDate}`
          }
          let currWeek = currTime.getDay();

          for (let i = 0; i < weeks.length; i++) {
            if (currWeek === weeks) {
              arr.push(`${currYear}-${currMonth}-${currDate}`);
            }
          }
        });
      }


      return arr;

    },


};

module.exports = datatime;