const fetchRetried = require('@ambassify/fetch-retried')
const fetch = fetchRetried({ delay: 10000 })

const awsParamStore = require('aws-param-store')

const checkResponse = res => res.ok ? res.json() : Promise.reject(res)

module.exports = async function () {
  return awsParamStore.getParameter('/worthawatch/erikberg-api-key')
    .then(({ Value }) => {
      let date = '20160429'
      let eventsUrl = `https://erikberg.com/events.json?date=${date}&sport=nba`
      let eventUrl = (id) => `https://erikberg.com/nba/boxscore/${id}.json`
      let opts = {
        headers: {
          'User-Agent': 'ianfeather',
          'Authorization': `bearer ${Value}`
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
    })
}
