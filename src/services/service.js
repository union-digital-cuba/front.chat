const saveItemLocalStorage = (item) => {
  let data = {
    userName: item,
    isLoggedIn: true,
  }
  localStorage.setItem('reactSocketApp', JSON.stringify(data))
}

const getItemLocalStorage = (item) => {
  return JSON.parse(localStorage.getItem(item))
}

const removeItemLocalStorage = (item) => {
  localStorage.removeItem(item)
}

export { saveItemLocalStorage, getItemLocalStorage, removeItemLocalStorage }
