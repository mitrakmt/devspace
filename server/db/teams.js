let Sequelize = require('sequelize')

module.exports = (db) => {
  const Teams = db.define('teams', {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    owner: {
      type: Sequelize.INTEGER
    }
  })

  return Teams
}
