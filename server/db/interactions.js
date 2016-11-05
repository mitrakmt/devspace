let Sequelize = require('sequelize')

module.exports = (db) => {
  const Interactions = db.define('interactions', {})

  return Interactions
}
