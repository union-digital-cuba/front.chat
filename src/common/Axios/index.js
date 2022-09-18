const axios = require('axios')
const url = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api`

const CustomAxios = () => {
  const instance = axios.create({
    baseURL: url,
    headers: {
      // 'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
  })

  instance.defaults.headers.common['Content-Type'] = 'application/json'

  return instance
}

export default CustomAxios
