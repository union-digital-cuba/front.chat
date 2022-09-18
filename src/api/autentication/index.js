// import bcrypt from 'bcryptjs';
import Axios from 'common/Axios'

export const AuthenticationAPI = {
  Login: async (username, password) => {
    const endpoint = '/user/login'

    const { data } = await Axios().post(endpoint, { username, password })
    return data
  },
  Register: async (username, password, email) => {
    const endpoint = '/user/register'

    const { data } = await Axios().post(endpoint, { username, password, email })
    return data
  },
}
