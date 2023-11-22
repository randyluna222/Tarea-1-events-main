import { handleInterested, handleGoing, handleFavorite } from '../events.js'
import { dateSet, locationSet, priceSet } from './card__info__format.js'
import LocalStorageManager from './singleton__pattern.js'

const localStorageManager = new LocalStorageManager()

export function buildGrid (data) {
  const calendarContainer = document.querySelector('.calendar')
  const grid = document.getElementById('grid')
  if (calendarContainer) {
    calendarContainer.style.display = 'none'
    grid.style.display = 'flex'
    grid.textContent = ''
  }
  const goingList = localStorageManager.getItem('Going')
  const interestedList = localStorageManager.getItem('Interested')
  const favoriteList = localStorageManager.getItem('Favorite')
  grid.textContent = ''
  const temp = new DocumentFragment()

  if (!data || !Array.isArray(data)) {
    return // Verificar si el objeto data es nulo, indefinido o no es un array
  }

  data.forEach(item => {
    const card = document.createElement('div')
    card.className = 'card'

    const img = document.createElement('img')
    img.src = item.image

    const title = document.createElement('h3')
    title.textContent = item.title

    const date = document.createElement('p')
    date.textContent = dateSet(item.date)
    date.className = 'date'

    const location = document.createElement('p')
    location.textContent = locationSet(item.location)
    location.className = 'location'

    const price = document.createElement('p')
    price.textContent = priceSet(item.price)
    price.className = 'price'

    const interested = document.createElement('button')
    interested.textContent = 'Interested'
    interested.classList.add('interestedBtn')
    interested.id = item.id
    interested.addEventListener('click', handleInterested)

    const going = document.createElement('button')
    going.textContent = 'Going'
    going.classList.add('goingBtn')
    going.id = item.id
    going.addEventListener('click', handleGoing)

    const favorite = document.createElement('button')
    favorite.textContent = 'Favorite'
    favorite.classList.add('favoriteBtn')
    favorite.id = item.id
    favorite.addEventListener('click', handleFavorite)

    card.appendChild(img)
    card.appendChild(title)
    card.appendChild(date)
    card.appendChild(location)
    card.appendChild(price)
    card.appendChild(interested)
    card.appendChild(going)
    card.appendChild(favorite)
    temp.appendChild(card)

    if (favoriteList && favoriteList.some(event => event.id === item.id)) {
      handleFavorite({ target: favorite })
    }
    if (goingList && goingList.some(event => event.id === item.id)) {
      handleGoing({ target: going })
    }
    if (interestedList && interestedList.some(event => event.id === item.id)) {
      handleInterested({ target: interested })
    }
  })
  grid.appendChild(temp)
}

export function buildView (data) {
  const overlay = document.getElementById('overlay')
  overlay.style.display = 'block'

  const card = document.querySelector('.hidden__card')
  card.textContent = ''

  const img = document.createElement('img')
  img.src = data.image

  const title = document.createElement('h3')
  title.textContent = data.title

  const date = document.createElement('p')
  date.textContent = dateSet(data.date)
  date.className = 'date'

  const location = document.createElement('p')
  location.textContent = locationSet(data.location)
  location.className = 'location'

  const price = document.createElement('p')
  price.textContent = priceSet(data.price)
  price.className = 'price'

  card.appendChild(img)
  card.appendChild(title)
  card.appendChild(date)
  card.appendChild(location)
  card.appendChild(price)
  card.style.display = 'inline-block'
}
