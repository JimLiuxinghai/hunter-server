const monthEnum = [
  '01','02','03','04','05','06',
  '07','08','09','10','11','12',
]

const dayEnum = [
  '01','02','03','04','05','06','07','08','09','10',
  '11','12','13','14','15','16','17','18','19','20',
  '21','22','23','04','25','26','27','28','29','30', '31',
]

const timeEnum = [
  '00',
  '01','02','03','04','05','06','07','08','09','10',
  '11','12','13','14','15','16','17','18','19','20',
  '21','22','23','04','25','26','27','28','29','30',
  '31','32','33','34','35','36','37','38','39','40',
  '41','42','43','44','45','46','47','48','49','50',
  '51','52','53','54','55','56','57','58','59',
]

const datatime = {

  parseStampToFormat( timestamp ) {
    let _date = new Date(timestamp * 1);
    let parsedDate = `${_date.getFullYear()}-${monthEnum[_date.getMonth()]}-${dayEnum[_date.getDate()-1]}`;
    let parseTime = `${timeEnum[_date.getHours()]}:${timeEnum[_date.getMinutes()]}:${timeEnum[_date.getSeconds()]}`;
    let parseDatetime = `${parsedDate} ${parseTime}`;
    return parseDatetime;
  },

  getNowDatetime() {
    let timestamp = new Date().getTime()
    let nowDatetime = this.parseStampToFormat( timestamp )
    return nowDatetime
  },
  format: function (d, format = 'yyyy-MM-dd') {
    /*
     * format='yyyy-MM-dd hh:mm:ss';
     */
    const o = {
      'M+': d.getMonth() + 1,
      'd+': d.getDate(),
      'h+': d.getHours(),
      'm+': d.getMinutes(),
      's+': d.getSeconds(),
      'q+': Math.floor((d.getMonth() + 3) / 3),
      'S': d.getMilliseconds()
    };

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4
        - RegExp.$1.length));
    }

    for (let k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1
          ? o[k]
          : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return format;
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
   * 切换日期
   * @param date {String} 2016-08-01
   * @param num {Number} 等于 0 当天
   *                       大于0  例如为1时 2016-08-02
   *                      小于0  例如为-1时 2016-07-31
   * */
  switch: function (date, num) {
    let thisTime = new Date(date).getTime();
    let lastTime = new Date(thisTime - (num * 86400000));
    let lastYear = lastTime.getFullYear();
    let lastMonth = lastTime.getMonth() + 1;
    lastMonth = lastMonth < 10 ? `0${lastMonth}` : lastMonth;
    let lastDay = lastTime.getDate();
    lastDay = lastDay < 10 ? `0${lastDay}` : lastDay;
    let hour = lastTime.getHours();
    hour = hour < 10 ? `0${hour}` : hour;
    let minute = lastTime.getMinutes();
    minute = minute < 10 ? `0${minute}` : minute;
    let second = lastTime.getSeconds();
    second = second < 10 ? `0${second}` : second;
    return `${lastYear}-${lastMonth}-${lastDay} ${hour}:${minute}:${second}`;
  },

};

export default datatime;