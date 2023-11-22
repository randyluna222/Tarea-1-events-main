import { createTabs, changeColor } from '../src/modules/tabs.js'
import { storageInfo } from '../src/events.js'
import { categories, yourEvents } from '../src/settings.js'
import LocalStorageManager from './modules/singleton__pattern.js'

const localStorageManager = new LocalStorageManager()

if (localStorageManager.getItem('Going') === null) {
  yourEvents.forEach(category => {
    if (category.id !== 'Calendar') {
      localStorageManager.setItem(category.id, [])
    }
  })
}

createTabs(categories)

const tabButtons = document.querySelectorAll('.tabButton')
let API_URL

// Init
changeColor(0)
API_URL = 'https://knassbani2.execute-api.us-east-2.amazonaws.com/events/music'
await storageInfo(API_URL, 'music')

// Agrega un controlador de eventos al botón
tabButtons.forEach(function (element, index) {
  element.addEventListener('click', async function () {
    changeColor(index)
    API_URL = `https://knassbani2.execute-api.us-east-2.amazonaws.com/events/${element.id}`
    await storageInfo(API_URL, element.id)
  })
})
