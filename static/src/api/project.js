import Request from './../utils/request'

const prolist = async ( data ) => {
  let result = await Request.get({
    url: '/api/project',
    data: data
  })
  return result
}


export  { prolist }

