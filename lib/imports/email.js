const AWS = require('aws-sdk')
const ses = new AWS.SES({
  region: process.env.AWS_DEPLOY_REGION
})
const address = 'info@ianfeather.co.uk'

const getEmailParams = ({ subject, body }) => {
  return {
    Destination: { ToAddresses: [ address ] },
    Source: address,
    Message: {
      Subject: { Data: subject },
      Body: { Text: { Data: body } }
    }
  }
}

const shouldSendEmail = () => process.env.ENV === 'prod'

module.exports = {
  expired: () => {
    return new Promise((resolve, reject) => {
      if (!shouldSendEmail()) resolve()
      let emailParams = getEmailParams({
        subject: 'Erikberg API Key has Expired',
        body: 'Go to: https://erikberg.com/account/token'
      })

      ses.sendEmail(emailParams, (err, data) => {
        if (err) {
          return reject(err)
        }
        console.log(`Sent Token Expired email to ${address}`)
        resolve(data)
      })
    })
  },

  expiringSoon: () => {
    return new Promise((resolve, reject) => {
      if (!shouldSendEmail()) resolve()
      let emailParams = getEmailParams({
        subject: 'Erikberg API Key expires in < 3 days',
        body: 'Go to: https://erikberg.com/account/token'
      })

      ses.sendEmail(emailParams, (err, data) => {
        if (err) {
          return reject(err)
        }
        console.log(`Sent Token Expiring email to ${address}`)
        resolve(data)
      })
    })
  }
}
