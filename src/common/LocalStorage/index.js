const StorageName = 'chat-shy-shy'

const LocalStorage = {
  Set: (data) => {
    localStorage.setItem(StorageName, JSON.stringify(data))
  },

  Get: () => {
    return JSON.parse(localStorage.getItem(StorageName))
  },

  Remove: () => {
    localStorage.removeItem(StorageName)
  },
}

export default LocalStorage
