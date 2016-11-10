let Sequelize = require('sequelize')

module.exports = (db) => {
  const Comments = db.define('comments', {
    content: {
      type: Sequelize.STRING
    },
    postId: {
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING
    }
  })

  return Comments
}
