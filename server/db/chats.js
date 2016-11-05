let Sequelize = require('sequelize')

module.exports = (db) => {
  const Chats = db.define('chats', {
    content: {
      type: Sequelize.STRING
    },
    receiverId: {
      type: Sequelize.INTEGER
    }
  })

  return Chats
}
