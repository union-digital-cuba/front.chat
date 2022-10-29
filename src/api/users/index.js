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
  GetUsersByGroup: async (groupId, userId) => {
    const endpoint = `/users/group?groupId=${groupId}&userId=${userId}`

    const { data } = await Axios().get(endpoint)
    return data
  },
}
