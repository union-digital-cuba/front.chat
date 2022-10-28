import Axios from 'common/Axios'

export const UsersAPI = {
  GetAll: async () => {
    const endpoint = '/users'

    const { data } = await Axios().get(endpoint)
    return data
  },
  GetOneById: async (id) => {
    const endpoint = `/user?id=${id}`

    const { data } = await Axios().get(endpoint)
    return data
  },
  GetUsersByGroup: async (id) => {
    const endpoint = `/users/group?id=${id}`

    const { data } = await Axios.get(endpoint)
    return data
  },
}
