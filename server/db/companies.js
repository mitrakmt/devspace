let Sequelize = require('sequelize')

module.exports = (db) => {
  const Companies = db.define('companies', {
    name: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    },
    founded: {
      type: Sequelize.DATE
    },
    description: {
      type: Sequelize.STRING
    },
    owner: {
      type: Sequelize.INTEGER
    }
  })

  return Companies
}
