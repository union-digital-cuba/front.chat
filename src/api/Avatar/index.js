import Axios from 'common/Axios'
import axios from 'axios'

//! https://multiavatar.com/

import { Chars } from 'common/Constants'
import { GetRandomWordFromArrayAndLength } from 'helpers/random'
import { ConvertToBase64 } from 'helpers/images'

const api = 'https://api.multiavatar.com/'

export const MultiAvatarAPI = {
  GetRandomAvatar: async ({ amount }) => {
    try {
      const avatars = []

      for (let index = 0; index < amount; index++) {
        const avatarName = GetRandomWordFromArrayAndLength(Chars, amount)
        const endpoint = `${api}${avatarName}`
        const { data } = await axios.get(endpoint, { timeout: 2000 })

        const image = ConvertToBase64(data)
        avatars[index] = image
      }

      return avatars
    } catch (error) {
      return error
    }
  },
}

export const AvatarAPI = {
  SetAvatar: async ({ user, avatar }) => {
    try {
      const endpoint = `user/avatar?id=${user.id}`
      const { data } = await Axios().post(endpoint, { image: avatar })
      return data
    } catch (error) {
      return error
    }
  },
  GetAvatars: async ({ amount }) => {
    try {
      const endpoint = `avatars?amount=${amount}`
      const { data } = await Axios().get(endpoint, { timeout: 2000 })

      const avatars = data.response.map((p) => {
        return ConvertToBase64(p)
      })

      return avatars
    } catch (error) {
      return error
    }
  },
}
