function padLeft (val) {
  if (val > 9) return val
  return `0${val}`
}

function formatDate (date) {
  return `${date.getFullYear()}${padLeft(date.getMonth() + 1)}${padLeft(date.getDate())}`
}

module.exports = function createDate () {
  let today = new Date()
  let yesterday = new Date(Date.now() - 86400000)
  return {
    today: formatDate(today),
    yesterday: formatDate(yesterday)
  }
}
