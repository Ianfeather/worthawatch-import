const fetch = require('node-fetch')
const awsParamStore = require('aws-param-store')

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
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(async function ({ event = [] }) {
          return Promise.all(event.map(async function (game) {
            let stats
            try {
              console.log(eventUrl(game.event_id))
              stats = await fetch(eventUrl(game.event_id), opts).then(res => res.json())
            } catch (e) {
              console.log(e)
            }
            return Object.assign({}, game, stats)
          }))
        })
    })
}
