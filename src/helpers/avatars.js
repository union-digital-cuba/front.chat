import { GetRandomElementFromList } from './random'

const listOfAvatarsName = [
  'daniel',
  'elliot',
  'jenny',
  'matthew',
  'molly',
  'steve',
  'berto',
  'indi',
  'jenny',
  'leonard',
  'lili',
  'nancy',
]
const GetRandomAvatarName = () => {
  return GetRandomElementFromList(listOfAvatarsName)
}

const GetTakeLocalAvatars = (amount) => {
  const avatars = []
  while (avatars.length < amount) {
    const name = GetRandomAvatarName()
    if (avatars.indexOf(name) === -1) avatars.push(`${name}.svg`)
  }
  return avatars
}

export { GetRandomAvatarName, GetTakeLocalAvatars }
