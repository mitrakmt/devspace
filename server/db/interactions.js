let Sequelize = require('sequelize')

module.exports = (db) => {
  const Interactions = db.define('interactions', {
    comment: {
      type: Sequelize.STRING
    },
    liked: {
      type: Sequelize.BOOLEAN
    }
  })

  return Interactions
}
