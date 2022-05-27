function saveItemLocalStorage(item) {
  let data = {
    userName: item,
    isLoggedIn: true
  };
  localStorage.setItem('reactSocketApp', JSON.stringify(data));
}

function getItemLocalStorage(item) {
  return JSON.parse(localStorage.getItem(item));
}

function removeItemLocalStorage(item) {
  localStorage.removeItem(item);
}

export {
  saveItemLocalStorage,
  getItemLocalStorage,
  removeItemLocalStorage
}