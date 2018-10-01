function padLeft (val) {
  if (val > 9) return val
  return `0${val}`
}

export default function createDate () {
  let now = new Date()

  return `${now.getFullYear()}${padLeft(now.getMonth() + 1)}${padLeft(now.getDate())}`
}
