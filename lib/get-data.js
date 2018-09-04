const fetch = require('node-fetch')
const awsParamStore = require('aws-param-store')

module.exports = async function () {
  return awsParamStore.getParameter('/worthawatch/erikberg-api-key')
    .then(({ Value }) => {
      var url = 'https://erikberg.com/events.json?date=20160429&sport=nba'
      var opts = {
        headers: {
          'User-Agent': 'ianfeather',
          'Authorization': `bearer ${Value}`
        }
      }

      return fetch(url, opts)
        .then(res => res.ok ? res.json() : Promise.reject(res))
    })
}
