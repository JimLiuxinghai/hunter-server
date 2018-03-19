import Request from './../utils/request'

const unDeal = async ( data ) => {
  let result = await Request.get({
    url: '/api/getExistDeal',
    data: data
  })
  return result
}

export  {unDeal}