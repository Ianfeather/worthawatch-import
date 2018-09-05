const fetchRetried = require('@ambassify/fetch-retried')
const fetch = fetchRetried({ delay: 10000, retries: 5 })

const checkResponse = res => res.ok ? res.json() : Promise.reject(res)

module.exports = (token, date) => {
  let eventsUrl = `https://erikberg.com/events.json?date=${date}&sport=nba`
  let eventUrl = (id) => `https://erikberg.com/nba/boxscore/${id}.json`
  let opts = {
    headers: {
      'User-Agent': 'ianfeather',
      'Authorization': `bearer ${token}`
    }
  }

  return fetch(eventsUrl, opts)
    .then(checkResponse)
    .then(({ event = [] }) => {
      return Promise.all(event.map(async function (game) {
        return Object.assign(
          {},
          game,
          await fetch(eventUrl(game.event_id), opts).then(checkResponse)
        )
      }))
    })
}
