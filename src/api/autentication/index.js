import Axios from 'common/Axios'

export const AuthenticationAPI = {
  Login: async ({ username, password }) => {
    const endpoint = '/user/login'

    const { data } = await Axios().post(endpoint, { username, password })
    return data
  },
  Register: async ({ username, email, password }) => {
    const endpoint = '/user/register'

    const { data } = await Axios().post(endpoint, { username, password, email })
    return data
  },
  SetAvatar: async ({ avatar }) => {
    const endpoint = `/user/set-avatar/${avatar}`
    console.log(endpoint)
    // const {data} = await Axios().
  },
}
