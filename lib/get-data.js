const store = require('./imports/db').store
const lookupInDB = require('./imports/db').exists
const fetchResults = require('./imports/fetch-results')
const createDate = require('./imports/create-date')

module.exports = async function ({ date = createDate() }) {
  console.log(`Looking up yesterday (${date.yesterday}) in DB`)

  return lookupInDB(date.yesterday)
    .then((data = {}) => {
      if (data.Item && data.Item.completed) {
        console.log(`Yesterday exists and is marked as complete`)

        console.log(`Looking up today (${date.today}) in DB`)
        return lookupInDB(date.today)
          .then((data = {}) => {
            if (data.Item && data.Item.completed) {
              console.log(`Today exists and is marked as complete`)
              return `${date.yesterday} and ${date.today} already stored`
            }
            console.log(`Fetching results for ${date.today}`)
            return fetchResults(date.today)
              .then(data => store(data, date.today, data.completed))
              .catch((err) => {
                throw err
              })
          })
      }

      console.log(`Fetching results for ${date.yesterday}`)
      return fetchResults(date.yesterday)
        .then(data => store(data, date.yesterday, data.completed))
        .catch((err) => {
          throw err
        })
    })
}
