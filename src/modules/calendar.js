import { buildView } from './grids.js'
import LocalStorageManager from './singleton__pattern.js'

const localStorageManager = new LocalStorageManager()
let calendarEvents = []

const goingEvents = localStorageManager.getItem('Going')
const interestedEvents = localStorageManager.getItem('Interested')
const favoriteEvents = localStorageManager.getItem('Favorite')

const currentDate = new Date()
let currentYear = currentDate.getFullYear()
let currentMonth = currentDate.getMonth()
const monthTitle = document.querySelector('.current-month-title')
const yearTitle = document.querySelector('.current-year-title')
const firstDayOfWeek = 0

export function initializeCalendar () {
  const gridContainer = document.querySelector('#grid')
  gridContainer.style.display = 'none'
  calendarEvents = []
  calendarEvents.push(...localStorageManager.getItem('Favorite'), ...localStorageManager.getItem('Going'), ...localStorageManager.getItem('Interested'))
  const cleanCalendarEvents = calendarEvents.filter((objeto, indice, self) =>
    indice === self.findIndex((t) => (
      t.id === objeto.id
    ))
  )

  const calendarContainer = document.querySelector('.calendar')
  calendarContainer.style.display = 'block'

  const grid = document.getElementById('grid')
  grid.textContent = ''

  // Vaciar el contenido del contenedor de días
  const daysContainer = document.getElementById('calendar-days')
  daysContainer.innerHTML = ''

  // Obtener el año y mes actual
  currentYear = currentDate.getFullYear()
  currentMonth = currentDate.getMonth()

  monthTitle.textContent = getCurrentMonthName()
  yearTitle.textContent = currentYear

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)

  // Obtener el número de días de la semana que deben mostrarse antes del primer día del mes
  let daysToPrepend = firstDayOfMonth.getDay() - firstDayOfWeek
  if (daysToPrepend < 0) {
    daysToPrepend += 7
  }

  // Crear los elementos de día para cada día del mes
  for (let i = 0; i < daysToPrepend; i++) {
    const dayElement = document.createElement('div')
    dayElement.classList.add('day', 'empty-day') // Agrega una clase para dar estilo a los días vacíos
    daysContainer.appendChild(dayElement)
  }

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const dayElement = document.createElement('div')
    dayElement.classList.add('day')
    dayElement.textContent = i

    // Resaltar el día actual
    if (currentDate.getDate() === i && currentDate.getMonth() === currentMonth) {
      dayElement.classList.add('current-day')
    }

    // Buscar eventos para este día
    const eventsForDay = findEventsForDay(i, cleanCalendarEvents)
    if (eventsForDay.length > 0) {
      eventsForDay.forEach(event => {
        const eventElement = document.createElement('button')
        eventElement.classList.add('event')
        eventElement.textContent = event.title

        if (goingEvents.some(objeto => objeto.id === event.id)) {
          eventElement.classList.add('going__event')
        } else if (interestedEvents.some(objeto => objeto.id === event.id)) {
          eventElement.classList.add('interested__event')
        } else if (favoriteEvents.some(objeto => objeto.id === event.id)) {
          eventElement.classList.add('favorite__event')
        }
        dayElement.appendChild(eventElement)

        eventElement.onclick = function () {
          buildView(event)
        }
      })
    }

    daysContainer.appendChild(dayElement)
  }
}

export function showPreviousMonth () {
  currentMonth--
  if (currentMonth < 0) {
    currentMonth = 11
    currentYear--
  }
  monthTitle.textContent = getCurrentMonthName()
  yearTitle.textContent = currentYear
  updateCalendar()
}

export function showNextMonth () {
  currentMonth++
  if (currentMonth > 11) {
    currentMonth = 0
    currentYear++
  }
  monthTitle.textContent = getCurrentMonthName()
  yearTitle.textContent = currentYear
  updateCalendar()
}

function updateCalendar () {
  // Vaciar el contenido del contenedor de días
  const daysContainer = document.getElementById('calendar-days')
  daysContainer.innerHTML = ''

  calendarEvents = []
  calendarEvents.push(...localStorageManager.getItem('Favorite'), ...localStorageManager.getItem('Going'), ...localStorageManager.getItem('Interested'))
  const cleanCalendarEvents = calendarEvents.filter((objeto, indice, self) =>
    indice === self.findIndex((t) => (
      t.id === objeto.id
    ))
  )

  // Obtener el primer día del mes y el número de días en el mes actual
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)

  // Obtener el número de días de la semana que deben mostrarse antes del primer día del mes
  let daysToPrepend = firstDayOfMonth.getDay() - firstDayOfWeek
  if (daysToPrepend < 0) {
    daysToPrepend += 7
  }

  // Crear los elementos de día para cada día del mes
  for (let i = 0; i < daysToPrepend; i++) {
    const dayElement = document.createElement('div')
    dayElement.classList.add('day', 'empty-day') // Agrega una clase para dar estilo a los días vacíos
    daysContainer.appendChild(dayElement)
  }
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const dayElement = document.createElement('div')
    dayElement.classList.add('day')
    dayElement.textContent = i

    // Resaltar el día actual
    if (currentDate.getDate() === i && currentDate.getMonth() === currentMonth) {
      dayElement.classList.add('current-day')
    }

    // Buscar eventos para este día
    const eventsForDay = findEventsForDay(i, cleanCalendarEvents)
    if (eventsForDay.length > 0) {
      eventsForDay.forEach(event => {
        const eventElement = document.createElement('button')
        eventElement.classList.add('event')
        eventElement.textContent = event.title
        eventElement.onclick = function () {
          buildView(event)
        }
        if (goingEvents.some(objeto => objeto.id === event.id)) {
          eventElement.classList.add('going__event')
        } else if (interestedEvents.some(objeto => objeto.id === event.id)) {
          eventElement.classList.add('interested__event')
        } else if (favoriteEvents.some(objeto => objeto.id === event.id)) {
          eventElement.classList.add('favorite__event')
        }
        dayElement.appendChild(eventElement)
      })
    }

    daysContainer.appendChild(dayElement)
  }
}

function getCurrentMonthName () {
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  return months[currentMonth]
}

function findEventsForDay (day, eventList) {
  const eventsForDay = eventList.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate.getDate() === day && eventDate.getMonth() === currentMonth
  })
  return eventsForDay
}
