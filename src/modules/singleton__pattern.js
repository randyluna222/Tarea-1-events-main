class LocalStorageManager {
  constructor () {
    if (!LocalStorageManager.instance) {
      LocalStorageManager.instance = this
    }
    return LocalStorageManager.instance
  }

  // Guardar un elemento en el Local Storage
  setItem (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  // Obtener un elemento del Local Storage
  getItem (key) {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }

  // Eliminar un elemento del Local Storage
  removeItem (key) {
    localStorage.removeItem(key)
  }
}

export default LocalStorageManager
