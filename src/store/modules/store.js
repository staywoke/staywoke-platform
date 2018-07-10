export const tempStore = {
  put (key, value) {
    var setItemToStorage = window.localStorage
      ? window.localStorage.setItem.bind(window.localStorage)
      : window.sessionStorage
        ? window.sessionStorage.setItem.bind(window.sessionStorage)
        : () => {}

    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }

    return setItemToStorage(key, value)
  },
  get (key) {
    if (!key) {
      throw new Error('must provide a key')
    }

    var getItemFromStore = window.localStorage
      ? window.localStorage.getItem.bind(window.localStorage)
      : window.sessionStorage
        ? window.sessionStorage.getItem.bind(window.sessionStorage)
        : () => {}
    var item = getItemFromStore(key)

    if (item) {
      return JSON.parse(item)
    }

    return null
  }
}
