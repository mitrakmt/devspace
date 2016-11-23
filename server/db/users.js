let Sequelize = require('sequelize')

module.exports = (db) => {
  const Users = db.define('users', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    bio: {
      type: Sequelize.STRING
    },
    imageUrl: {
      type: Sequelize.STRING
    },
    followerCount: {
      type: Sequelize.INTEGER
    },
    followingCount: {
      type: Sequelize.INTEGER
    },
    cashFlow: {
      type: Sequelize.INTEGER
    }
  })

  return Users
}
