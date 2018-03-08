import Request from './../utils/request'

const errorList = async (data) => {
  let result = await Request.get({
    url: '/api/errorList',
    data: data
  });
  return result
};

export  {errorList}