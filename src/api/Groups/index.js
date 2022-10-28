import Axios from 'common/Axios'

export const GroupsAPI = {
  GetAllPublics: async () => {
    const endpoint = '/groups'

    const { data } = await Axios().get(endpoint)
    return data
  },
  GetOneById: async (id) => {
    const endpoint = `/user?id=${id}`

    const { data } = await Axios().get(endpoint)
    return data
  },
  GetAllByUserId: async (id) => {
    const endpoint = `/groups/user?id=${id}`

    const { data } = await Axios().get(endpoint)
    return data
  },
}
