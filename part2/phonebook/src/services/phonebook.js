import axios from 'axios'
const baseUrl = '/API/persons'

const getAll = () => {    
      return axios      
	        .get(baseUrl)      
	        .then(response => response.data )  
}

const deleteItem = (id) => {
	console.log("deleting item:", id)
	return axios.delete(`${baseUrl}/${id}`)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
  			  .then(response => response.data)
}

const update = (id, newObject) => {
	return axios.put(`${baseUrl}/${id}`, newObject)
				.then(response => response.data)
}

export default { getAll, create, update, deleteItem }