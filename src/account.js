import { createTabs, changeColor } from '../src/modules/tabs.js'
import { yourEvents } from '../src/settings.js'
import { buildGrid } from './modules/grids.js'
import LocalStorageManager from './modules/singleton__pattern.js'
import { initializeCalendar, showPreviousMonth, showNextMonth } from './modules/calendar.js'

document.getElementById('overlay').onclick = function () {
  const overlay = document.getElementById('overlay')
  const card = document.querySelector('.hidden__card')
  overlay.style.display = 'none'
  card.style.display = 'none'
}

const localStorageManager = new LocalStorageManager()

createTabs(yourEvents)
changeColor(0)
buildGrid(localStorageManager.getItem('Favorite'))

const tabButtons = document.querySelectorAll('.tabButton')

// Agrega un controlador de eventos al botón
tabButtons.forEach(function (element, index) {
  element.addEventListener('click', async function (event) {
    changeColor(index)
    if (element.id !== 'Calendar') {
      buildGrid(localStorageManager.getItem(event.target.id))
    }
  })
})

const calendarButton = document.getElementById('Calendar')
calendarButton.addEventListener('click', initializeCalendar)

document.getElementById('prev-month-btn').addEventListener('click', showPreviousMonth)
document.getElementById('next-month-btn').addEventListener('click', showNextMonth)
