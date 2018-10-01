const awsParamStore = require('aws-param-store')

const store = require('./imports/db').store
const lookupInDB = require('./imports/db').exists
const fetchResults = require('./imports/fetch-results')
const createDate = require('./imports/create-date')
const sendTokenExpiredEmail = require('./imports/email').expired

module.exports = async function ({ date = createDate() }) {
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
