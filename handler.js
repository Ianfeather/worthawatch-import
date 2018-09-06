let getData = require('./lib/get-data')
let checkTokenExpiry = require('./lib/check-token-expiry')

module.exports.import = async (event, context) => {
  try {
    return { statusCode: 200, body: await getData(event) }
  } catch (e) {
    // This might need improving. Right now it will return any upstream status
    // which could be erikberg or the db
    return { statusCode: e.status, body: e.statusText }
  }
}

module.exports.token = async (event, context) => {
  try {
    return { statusCode: 200, body: await checkTokenExpiry(event) }
  } catch (e) {
    return { statusCode: e.status, body: e.statusText }
  }
}
