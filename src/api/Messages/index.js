import Axios from 'common/Axios'

export const MessageAPI = {
  GetAllFromTo: async () => {
    const endpoint = '/messages'

    const { data } = await Axios().get(endpoint)
    return data
  },
  SendMessage: async ({ message }) => {
    const endpoint = '/message'

    const { data } = await Axios().post(endpoint, message)
    return data
  },
}
