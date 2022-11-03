import Axios from 'common/Axios'

export const MessageAPI = {
  SendMessage: async ({ message }) => {
    const endpoint = '/message'

    const { data } = await Axios().post(endpoint, message)
    return data
  },
  GetMessagesFromGroup: async ({ groupId }) => {
    const endpoint = '/messages/group'

    const { data } = await Axios().post(endpoint, { groupId })
    return data
  },
  GetMessagesFromUser: async ({ sender, receiver }) => {
    const endpoint = '/messages/user'

    const { data } = await Axios().post(endpoint, { sender, receiver })
    return data
  },
}
