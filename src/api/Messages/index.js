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
  GetMessagesFromGroup: async ({ sender, receiver }) => {
    const endpoint = '/messages/group'

    const { data } = await Axios().post(endpoint, { sender, receiver })
    return data
  },
  GetMessagesFromUser: async ({ sender, receiver }) => {
    const endpoint = '/messages/user'

    const { data } = await Axios().post(endpoint, { sender, receiver })
    return data
  },
}
