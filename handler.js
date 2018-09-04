let getData = require('./lib/get-data')

module.exports.import = async (event, context) => {
  try {
    return {
      statusCode: 200,
      body: await getData(event)
    }
  } catch (e) {
    return {
      statusCode: e.status,
      body: e.statusText
    }
  }
}
