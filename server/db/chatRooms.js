let Sequelize = require('sequelize')

module.exports = (db) => {
  const ChatRooms = db.define('chatRooms', {})

  return ChatRooms
}
