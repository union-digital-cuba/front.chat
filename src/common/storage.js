const USER = '**chat**user'

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER))
  } catch {
    return false
  }
}
const setUser = (data) => {
  localStorage.setItem(USER, JSON.stringify(data))
}
const removeUser = () => {
  localStorage.removeItem(USER)
}

export { getUser, setUser, removeUser }
