const crypto = require('crypto');
const util = {
	md5 ( str ) {
		let instance = crypto.createHash('md5');
	    instance.update(str + '', 'utf8');
	    return instance.digest('hex');
	}
}

module.exports = {
  util
}