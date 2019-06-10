export const Storage = {
  get: key => {
    try {
      return JSON.parse(localStorage.getItem(key))
    }
    catch(e) {
      console.error(e)
      return null
    }
  },
  save: (key, item) => {
    localStorage.setItem(key, JSON.stringify(item))
  }
}