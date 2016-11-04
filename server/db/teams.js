let Sequelize = require('sequelize')

module.exports = (db) => {
  const Teams = db.define('teams', {
    name: {
      type: Sequelize.STRING
    }
  })

  return Teams
}
