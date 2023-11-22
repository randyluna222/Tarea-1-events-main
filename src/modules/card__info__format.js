export function dateSet (dateStamp) {
  // Crear una instancia de Date utilizando el timestamp
  const date = new Date(dateStamp)

  // Días de la semana
  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  // Meses
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  // Obtener los componentes de la fecha
  const weekDay = week[date.getDay()]
  const month = months[date.getMonth()]
  const day = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  const period = hour >= 12 ? 'PM' : 'AM'

  // Formatear la hora
  const setHour = hour > 12 ? hour - 12 : hour
  const setMin = min.toString().padStart(2, '0')

  // Formatear la fecha y hora como una cadena legible para el usuario
  const setDate = `${weekDay}, ${month} ${day}, ${setHour}:${setMin} ${period}`

  // Mostrar la fecha y hora al usuario
  return setDate
}

export function locationSet (locationInfo) {
  const location = `${locationInfo.address} • ${locationInfo.city}, ${locationInfo.state}`
  return location
}

export function priceSet (priceInfo) {
  if (priceInfo !== 0) {
    if (Number.isInteger(priceInfo)) {
      const price = `$${priceInfo}.00`
      return price
    } else {
      const price = `$${priceInfo}`
      return price
    }
  } else {
    return 'Free'
  }
}
