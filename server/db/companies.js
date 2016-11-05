let Sequelize = require('sequelize')

module.exports = (db) => {
  const Companies = db.define('companies', {
    name: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  })

  return Companies
}
