const awsParamStore = require('aws-param-store')

const getExpiryDate = require('./imports/get-expiry-date')
const sendWarningEmail = require('./imports/email').expiringSoon

module.exports = async function ({ date = '20160425' }) {
  return awsParamStore.getParameter('/worthawatch/erikberg-api-key')
    .then(({ Value: token }) => getExpiryDate(token))
    .then(async function ({ token_expiration_seconds }) {
      let expiringSoon = token_expiration_seconds / 86400 < 3
      if (expiringSoon) {
        await sendWarningEmail()
      }
      return {
        expiring: expiringSoon
      }
    })
}
