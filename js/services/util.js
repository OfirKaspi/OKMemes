function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}

function saveToStorage(key, val) {
  const json = JSON.stringify(val)
  localStorage.setItem(key, json)
}

function loadFromStorage(key) {
  const json = localStorage.getItem(key)
  return JSON.parse(json)
}
