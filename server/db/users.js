let Sequelize = require('sequelize')

module.exports = (db) => {
  const Users = db.define('users', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    bio: {
      type: Sequelize.STRING
    },
    followerCount: {
      type: Sequelize.INTEGER
    },
    followingCount: {
      type: Sequelize.INTEGER
    }
  })

  return Users
}
