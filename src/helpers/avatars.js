import fs from 'fs'
import { GetRandomElementFromList } from './random'

const listOfAvatarsName = ['daniel.jpg', 'elliot.jpg', 'jenny.jpg', 'matthew.png', 'molly.png', 'steve.jpg']
const avatarFolderPath = 'assets/images/avatars'

const ListOfAvatarsByName = () =>
  fs.readdirSync(avatarFolderPath).map((file) => {
    file
  })

const GetRandomAvatarName = () => {
  return GetRandomElementFromList(listOfAvatarsName)
}

const GetTakeFirstNElements = ({ amount }) => {
  return listOfAvatarsName.slice(0, amount > 6 ? 6 : amount)
}

export { ListOfAvatarsByName, GetRandomAvatarName, GetTakeFirstNElements }
