import Axios from 'common/Axios'
import axios from 'axios'

//! https://multiavatar.com/

import { Chars } from 'common/Constants'
import { GetRandomWordFromArrayAndLength } from 'helpers/random'
import { ConvertToBase64 } from 'helpers/images'

const api = 'https://api.multiavatar.com/'

export const MultiAvatarAPI = {
  GetRandomAvatar: async (amount) => {
    try {
      const avatars = []

      for (let index = 0; index < amount; index++) {
        const avatarName = GetRandomWordFromArrayAndLength(Chars, amount)
        const endpoint = `${api}${avatarName}`
        const { data } = await axios.get(endpoint)

        const image = ConvertToBase64(data)
        avatars[index] = image
      }

      return avatars
    } catch (error) {
      return error
    }
  },
  SetAvatar: async ({ avatar }) => {
    const endpoint = `/user/set-avatar/${avatar}`

    const { data } = await Axios().post(endpoint, { avatar })
    return data
  },
}
