let Sequelize = require('sequelize')

module.exports = (db) => {
  const Comments = db.define('comments', {
    content: {
      type: Sequelize.STRING
    }
  })

  return Comments
}
