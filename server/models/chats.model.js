const Chats = require('../db').Chats
const chatsModel = {}

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

chatsModel.POST_MESSAGE = (userId, content, receiverId) => {
  return Chats.create({
    userId: userId,
    content: content,
    receiverId: receiverId
  })
  .then(chat => {
    return chat
  })
  .catch(err => {
    return 'Err in posting chat:' + err
  })
}

chatsModel.DELETE_MESSAGE = (userId, chatId) => {
  return Chats.findOne({
    where: {
      userId: userId,
      id: chatId
    }
  })
  .then(chat => {
    if (!chat) {
      return 'Bad request'
    }
    chat.destroy()
    return 'Chat successfully deleted'
  })
  .catch(err => {
    return 'Err in deleting chat:' + err
  })
}

module.exports = chatsModel
