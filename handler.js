let getData = require('./lib/get-data');

module.exports.import = async (event, context) => {

  let body = JSON.stringify(getData(event))

  return {
    statusCode: 200,
    body,
  };
};
