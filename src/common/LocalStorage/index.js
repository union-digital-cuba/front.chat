const LocalStorage = {
  saveInLocalStorage: (item) => {
    let data = {
      userName: item,
      isLoggedIn: true,
    }
    localStorage.setItem('chatApp', JSON.stringify(data))
  },

  getInLocalStorage: (item) => {
    return JSON.parse(localStorage.getItem(item))
  },

  removeInLocalStorage: (item) => {
    localStorage.removeItem(item)
  },
}

export default LocalStorage
