const GetRandomElementFromList = (listOfElements) => listOfElements[Math.floor(Math.random() * listOfElements.length)]

const GetRandomAvatarNumbers = (length) => {
  const avatar = []
  for (var pos = 0; pos < length; pos++) {
    avatar[pos] = Math.random() * 10000
  }
  return avatar
}

export { GetRandomElementFromList, GetRandomAvatarNumbers }
