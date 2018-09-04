const awsParamStore = require('aws-param-store')

const fetchResults = require('./imports/fetch-results')

module.exports = async function () {
  return awsParamStore.getParameter('/worthawatch/erikberg-api-key')
    .then(fetchResults)
}
