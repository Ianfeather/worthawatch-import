const fetchRetried = require('@ambassify/fetch-retried')
const fetch = fetchRetried({ delay: 10000, retries: 2 })

const checkResponse = res => res.ok ? res.json() : Promise.reject(res)

module.exports = (token, date) => {
  let tokenUrl = `https://erikberg.com/me.json`
  let opts = {
    headers: {
      'User-Agent': 'ianfeather',
      'Authorization': `bearer ${token}`
    }
  }

  return fetch(tokenUrl, opts).then(checkResponse)
}
