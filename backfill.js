let fetch = require('node-fetch')

const daysInMonth = {
  4: 30,
  6: 30,
  9: 30,
  11: 30,
  2: 29
}
const years = [/* 2016, */ 2017 /* 2018 */]

let now = new Date()

const today = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`

let zeroPad = (num) => num > 9 ? num : `0${num}`

let simpleFlatten = arr => {
  let flattened = []
  for (let item of arr) {
    if (!Array.isArray(item)) flattened.push(item)
    item.forEach(i => flattened.push(i))
  }
  return flattened
}

let scores = years.map(year => {
  return Array(1).fill('')
    .map((x, index) => {
      let month = index + 1
      return Array(daysInMonth[month] || 31).fill('')
        .map((x, index) => {
          let day = index + 1
          return `${year}${zeroPad(month)}${zeroPad(day)}`
        })
    })
}).map(simpleFlatten)

console.log(simpleFlatten(scores))

let counter = 0
