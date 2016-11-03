let Sequelize = require('sequelize')

module.exports = (db) => {
  let Users = db.define('users', {
    name: { type: Sequelize.STRING },
  })

  return Users
}
