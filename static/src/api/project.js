import Request from './../utils/request'

const prolist = async ( data ) => {
  let result = await Request.get({
    url: '/api/project',
    data: data
  })
  return result
}

const addProApi = async (data) => {
	let result = await Request.post({
	  url: '/api/project',
	  data: data
	})
	return result
}

const isRepeat = async (data) => {
	let result = await Request.get({
		url: '/api/project/name',
		data: data
	})
	return result
}

const proUser = async (data) => {
	let result = await Request.get({
		url: '/api/project/user',
		data: data
	})
	return result
}
export  { prolist, addProApi, isRepeat, proUser }

