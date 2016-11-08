const chatsModel = {}
const Chats = require('../db').Chats
const Users = require('../db').Users

chatsModel.GET_CHAT_HISTORY = (userId) => {
  return Chats.findAll({
    where: { userId: userId }
  })
}

chatsModel.DELETE_CHAT_HISTORY = (userId) => {
  return Chats.destroy({
    where: { userId: userId }
  })
}

chatsModel.GET_CONVERSATION = (userId, receiverId) => {
  return Chats.findAll({
    where: {
      userId: userId,
      receiverId: receiverId
    }
  })
}

chatsModel.DELETE_CONVERSATION = (userId, receiverId) => {
  return Chats.destroy({
    where: {
      userId: userId,
      receiverId: receiverId
    }
  })
}

chatsModel.POST_CHAT = (userId, content, receiverId) => {
  return Chats.create({
    userId: userId,
    content: content,
    receiverId: receiverId
  })
  .then(chat => {
    return chat
  })
  .catch(err => {
    return ' Err in posting chat:' + err
  })
}

chatsModel.DELETE_CHAT = (userId, chatId) => {
  return Chats.findOne({
    where: {
      userId: userId,
      id: chatId
    }
  })
  .then(chat => {
    chat.destroy()
  })
  .catch(err => {
    console.log('Err in posting chat', err)
  })
}

module.exports = chatsModel
