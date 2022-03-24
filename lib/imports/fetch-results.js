const NBA = require('nba')

module.exports = (date) => {
  console.log({ date })
  return NBA.stats.scoreboard({gameDate: date})
    .then(data => {
      console.log('scoreboard - received')
      console.log(data.gameHeader.every(event => event.gameStatusText === 'Final'))
      return {
        date,
        completed: data.gameHeader.every(event => event.gameStatusText === 'Final'),
        data
      }
    })
    .catch(e => {
      console.log('failed to fetch')
      console.error(e)
    })
}
