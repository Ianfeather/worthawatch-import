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

      dynamoDb.get(params, (err, data = {}) => {
        if (err) {
          console.log(`getMessage ERROR=${err.stack}`)
          return reject(new Error({
            statusCode: 400,
            statusText: `Could not retrieve message: ${err.stack}`
          }))
        }
        resolve(!!data.Item)
      })
    })
  },
  store: (events, date) => {
    return new Promise((resolve, reject) => {
      const params = {
        TableName,
        Item: {
            date, events, completed: false
        },
      };

      dynamoDb.put(params, (err, data = {}) => {
        if (err) {
          console.log(`getMessage ERROR=${err.stack}`)
          return reject(new Error({
            statusCode: 400,
            statusText: `Could not create message: ${err.stack}`
          }))
        }
        resolve(`Stored: date`);
      })
      })
    })
  }
}
