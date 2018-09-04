let getData = require('./lib/get-data')

module.exports.import = async (event, context) => {
  try {
    return { statusCode: 200, body: await getData(event) }
  } catch (e) {
    // This might need improving. Right now it will return any upstream status
    return { statusCode: e.status, body: e.statusText }
  }
}
