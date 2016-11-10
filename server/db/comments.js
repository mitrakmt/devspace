let Sequelize = require('sequelize')

module.exports = (db) => {
  const Comments = db.define('comments', {
    content: {
      type: Sequelize.STRING
    },
    postId: {
      type: Sequelize.INTEGER
    }
  })

  return Comments
}
