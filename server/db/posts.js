let Sequelize = require('sequelize')

module.exports = (db) => {
  const Posts = db.define('posts', {
    paid: {
      type: Sequelize.BOOLEAN
    },
    likes: {
      type: Sequelize.INTEGER
    },
    content: {
      type: Sequelize.STRING
    }
  })

  return Posts
}
