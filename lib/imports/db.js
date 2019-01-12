const AWS = require('aws-sdk')

const TableName = process.env.DYNAMODB_TABLE
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_DEPLOY_REGION
})

module.exports = {
  exists: (date) => {
    return new Promise((resolve, reject) => {
      const params = {
        TableName,
        Key: { date }
      }
      console.log('*** date')
      console.log(date)
      console.log('*** params')
      console.log(params)

      dynamoDb.get(params, (err, data = {}) => {
        if (err) {
          console.log(`getMessage ERROR=${err.stack}`)
          return reject(new Error({
            statusCode: 400,
            statusText: `Could not retrieve message: ${err.stack}`
          }))
        }
        resolve(data)
      })
    })
  },

  store: (events, date, completed) => {
    return new Promise((resolve, reject) => {
      const params = {
        TableName,
        Item: {
          date, events, completed
        }
      }

      console.log(`Storing record for ${date}`)
      dynamoDb.put(params, (err, data = {}) => {
        if (err) {
          console.log(`getMessage ERROR=${err.stack}`)
          return reject(new Error({
            statusCode: 400,
            statusText: `Could not store event: ${err.stack}`
          }))
        }
        resolve(`Stored: ${date}`)
      })
    })
  }
}
