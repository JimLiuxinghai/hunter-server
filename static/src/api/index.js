import Request from './../utils/request'

const errorList = async (data) => {
  let result = await Request.get({
    url: '/api/errorList',
    data: data
  });
  return result
};
const errorByTime = async (data) => {
  let result = await Request.get({
    url: '/api/getErrByDay',
    data: data
  });
  return result
};

const errorUser = async (data) => {
	let result = await Request.get({
		url: '/api/errorUser',
		data: data
	})
	return result
}
export  {errorList, errorByTime, errorUser}