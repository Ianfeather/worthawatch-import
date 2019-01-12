const store = require('./imports/db').store
const lookupInDB = require('./imports/db').exists
const fetchResults = require('./imports/fetch-results')
const createDate = require('./imports/create-date')

module.exports = async function ({ date = createDate() }) {
  console.log(`Looking up ${date} in DB`)
  return lookupInDB(date)
    .then((data = {}) => {
      if (data.Item && data.Item.completed) {
        console.log(`Record exists and is marked as complete`)
        return 'ok'
      }

      console.log(`Fetching results for ${date}`)
      return fetchResults(date)
        .then(data => store(data, date, completed: data.completed))
        .catch((err) => {
          throw err
        })
    })
}
