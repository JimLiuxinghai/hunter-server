import Request from './../utils/request'

const unDeal = async ( data ) => {
  let result = await Request.get({
    url: '/api/getExistDeal',
    data: data
  })
  return result
}

const addDeal = async ( data) =>{
  let result = await Request.post({
    url:'/api/insertDeal',
    data: data
  })
  return result
}

const updateState = async ( data) =>{
  let result = await Request.post({
    url:'/api/updateState',
    data: data
  })
  return result
}

export  {unDeal, addDeal,updateState}