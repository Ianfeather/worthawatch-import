const AWS = require('aws-sdk')

const TableName = process.env.DYNAMODB_TABLE
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_DEPLOY_REGION
})

const isComplete = events => {
  let ongoingEvents = events.filter(event => {
    return event.event_information.event_status !== 'completed'
  })
  return ongoingEvents.length === 0
}

module.exports = {
  exists: (date) => {
    return new Promise((resolve, reject) => {
      const params = {
        TableName,
        Key: { date }
      }

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

  store: (events, date) => {
    return new Promise((resolve, reject) => {
      const params = {
        TableName,
        Item: {
          date, events, completed: isComplete(events)
        }
      }

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
