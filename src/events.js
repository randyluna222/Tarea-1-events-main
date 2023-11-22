import { fetchData } from './modules/fetch.js'
import { buildGrid } from './modules/grids.js'
import LocalStorageManager from './modules/singleton__pattern.js'

const localStorageManager = new LocalStorageManager()

const localStorageProxy = new Proxy(localStorage, {
  set: function (target, key, value) {
    // Convierte el valor a una cadena antes de guardarlo en el almacenamiento local
    target.setItem(key, JSON.stringify(value))
    return true
  },
  get: function (target, key) {
    // Obtén el valor del almacenamiento local y conviértelo a su tipo original
    const value = target.getItem(key)
    return value ? JSON.parse(value) : null
  }
})

export async function storageInfo (API_URL, id) {
  const cachedDataString = localStorageProxy[id]

  if (cachedDataString) {
    buildGrid(localStorageProxy[id])
  } else {
    const data = await fetchData(API_URL)
    localStorageProxy[id] = data
    buildGrid(localStorageProxy[id])
  }
}

// Función para el evento 'Interested'
export function handleInterested (event) {
  const interestedBtn = event.target
  const card = interestedBtn.parentNode
  card.classList.add('interested')

  const interestedList = localStorageManager.getItem('Interested')
  const key = document.querySelector('.active').id
  const eventId = event.target.id
  const events = localStorageManager.getItem(key)
  const selectedEvent = events.find(element => element.id === eventId)

  interestedBtn.remove()

  const interestedContainer = document.createElement('div')
  interestedContainer.classList.add('interested-notify-container')
  const message = document.createElement('p')
  message.textContent = 'You are interested in going.'
  interestedContainer.appendChild(message)

  const link1 = document.createElement('a')
  link1.textContent = 'Changed your mind?'
  link1.href = '#'
  link1.addEventListener('click', function (e) {
    e.preventDefault()
    card.removeChild(interestedContainer)
    card.appendChild(interestedBtn)
    const temp = interestedList.filter(element => element.id !== eventId)
    localStorageManager.setItem('Interested', temp)
    buildGrid(localStorageManager.getItem(key))
  })
  interestedContainer.appendChild(link1)
  card.appendChild(interestedContainer)

  // Aquí puedes agregar la lógica adicional para el evento 'Interested'
  const exist = interestedList.some(item => item.id === eventId)
  if (!exist) {
    interestedList.push(selectedEvent)
    localStorageManager.setItem('Interested', interestedList)
  }
  // ...
}

// Función para el evento 'Going'
export function handleGoing (event) {
  const goingBtn = event.target
  const card = goingBtn.parentNode
  let interestedBtn = card.querySelector('.interestedBtn')
  card.classList.add('going')

  const goingList = localStorageManager.getItem('Going')
  const interestedList = localStorageManager.getItem('Interested')
  const key = document.querySelector('.active').id
  const eventId = event.target.id
  const events = localStorageManager.getItem(key)
  const selectedEvent = events.find(element => element.id === eventId)

  goingBtn.remove()

  if (interestedBtn) {
    interestedBtn.remove() // Eliminar el botón 'Interested'
  } else {
    document.querySelector('.interested-notify-container').remove()
  }
  const deleteGoing = document.createElement('div')
  const message = document.createElement('p')
  message.textContent = 'You are going to this event'
  deleteGoing.appendChild(message)

  const link = document.createElement('a')
  link.textContent = 'Changed your mind?'
  link.href = '#'
  link.addEventListener('click', function (e) {
    e.preventDefault()
    card.removeChild(deleteGoing)
    interestedBtn = document.createElement('button')
    interestedBtn.textContent = 'Interested'
    interestedBtn.classList.add('interestedBtn')
    interestedBtn.id = eventId
    interestedBtn.addEventListener('click', handleInterested)
    card.appendChild(interestedBtn)
    card.appendChild(goingBtn)
    const temp = goingList.filter(element => element.id !== eventId)
    localStorageManager.setItem('Going', temp)
    buildGrid(localStorageManager.getItem(key))
  })
  deleteGoing.appendChild(link)
  card.appendChild(deleteGoing)
  // Aquí puedes agregar la lógica adicional para el evento 'Going'
  const exist = goingList.some(item => item.id === eventId)
  if (!exist) {
    goingList.push(selectedEvent)
    localStorageManager.setItem('Going', goingList)
  }
  const cleanedList = interestedList.filter(item => item.id !== eventId)
  localStorageManager.setItem('Interested', cleanedList)
  if (key === 'Interested') {
    buildGrid(localStorageManager.getItem(key))
  }
  // ...
}

// Función para el evento 'Favorite'
export function handleFavorite (event) {
  const favoriteBtn = event.target
  const card = favoriteBtn.parentNode
  card.classList.add('favorite')

  const favoriteList = localStorageManager.getItem('Favorite')
  const key = document.querySelector('.active').id
  const eventId = event.target.id
  const events = localStorageManager.getItem(key)
  const selectedEvent = events.find(element => element.id === eventId)

  favoriteBtn.remove()
  const deleteFavorite = document.createElement('div')
  const message = document.createElement('p')
  message.textContent = 'You love this event'
  deleteFavorite.appendChild(message)

  const link = document.createElement('a')
  link.textContent = 'Changed your mind?'
  link.href = '#'
  link.addEventListener('click', function (e) {
    e.preventDefault()
    card.removeChild(deleteFavorite)
    card.appendChild(favoriteBtn)
    const temp = favoriteList.filter(element => element.id !== eventId)
    localStorageManager.setItem('Favorite', temp)
    buildGrid(localStorageManager.getItem(key))
  })
  deleteFavorite.appendChild(link)
  card.appendChild(deleteFavorite)
  // Aquí puedes agregar la lógica adicional para el evento 'Going'
  const exist = favoriteList.some(item => item.id === eventId)
  if (!exist) {
    favoriteList.push(selectedEvent)
    localStorageManager.setItem('Favorite', favoriteList)
  }

  // ...
}
