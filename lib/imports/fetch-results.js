const NBA = require('nba')

const convertEmptyPropertiesToNull = (obj) => {
  for (let prop in obj) {
    if (obj[prop] === '') {
      obj[prop] = null
    }
  }
  return obj
}

const sanitise = ({ sports_content }) => {
  let { period_time, visitor, home } = sports_content.game
  return {
    completed: period_time.game_status === '3',
    away_stats: visitor.players.player.map(convertEmptyPropertiesToNull),
    away_period_scores: visitor.linescores.period.map(p => p.score),
    away_points_scored: visitor.score,
    away_totals: visitor.stats,
    away_team: {
      abbreviation: visitor.abbreviation,
      first_name: visitor.city,
      last_name: visitor.nickname
    },
    home_stats: home.players.player.map(convertEmptyPropertiesToNull),
    home_period_scores: home.linescores.period.map(p => p.score),
    home_points_scored: home.score,
    home_totals: home.stats,
    home_team: {
      abbreviation: home.abbreviation,
      first_name: home.city,
      last_name: home.nickname
    }
  }
}

module.exports = (date) => {
  return NBA.data.scoreboard(date)
    .then((data) => {
      return Promise.all(data.sports_content.games.game.map(async function (game) {
        return NBA.data.boxScore(date, game.id)
          .then(sanitise)
      }))
    }).then(events => {
      return {
        date,
        completed: !events.some(event => event.completed === false),
        events
      }
    })
    .catch(e => {
      console.log('failed to fetch')
      console.error(e)
    })
}
