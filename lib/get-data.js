const awsParamStore = require('aws-param-store')

const store = require('./imports/db').store
const existsAlready = require('./imports/db').exists
const fetchResults = require('./imports/fetch-results')

module.exports = async function () {
  let date = '20160428'

  return existsAlready(date)
    .then((data = {}) => {
      if (data.Item && data.Item.completed) {
        return 'ok'
      }
      return awsParamStore.getParameter('/worthawatch/erikberg-api-key')
        .then(({ Value: token }) => fetchResults(token, date))
        .then(data => store(data, date))
    })
}
