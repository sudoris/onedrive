import axios from 'axios'
const baseUrl = 'http://localhost:3333/uploads-index'

const getIndex = () => {
  return axios.get(baseUrl)
}

export default { 
  getIndex
}