const awsParamStore = require('aws-param-store')

const store = require('./imports/db').store
const lookupInDB = require('./imports/db').exists
const fetchResults = require('./imports/fetch-results')
const sendTokenExpiredEmail = require('./imports/email').expired

module.exports = async function () {
  let date = '20160425'

  return lookupInDB(date)
    .then((data = {}) => {
      if (data.Item && data.Item.completed) {
        return 'ok'
      }

      return awsParamStore.getParameter('/worthawatch/erikberg-api-key')
        .then(({ Value: token }) => fetchResults(token, date))
        .then(data => store(data, date))
        .catch(async function (err) {
          if (err.status === 401) {
            await sendTokenExpiredEmail()
          }
          throw err
        })
    })
}
