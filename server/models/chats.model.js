const chatsModel = {}
const Chats = require('../db').Chats
const Users = require('../db').Users

chatsModel.GET_CHAT_HISTORY = (userId) => {
  return Chats.findAll({
    where: { userId: userId }
  })
}

chatsModel.DELETE_CHAT_HISTORY = (userId) => {
  Chats.destroy({
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
  return Chats.findAll({
    where: {
      userId: userId,
      receiverId: receiverId
    }
  })
  .then(conversation => {
    conversation.destroy()
  })
}

chatsModel.POST_CHAT = (userId, content, receiverId) => {
  console.log('adding chat-userId:', userId, 'content', content, 'receiverId', receiverId)
  return Chats.create({
    content: content,
    receiverId: receiverId
  })
  .then(chat => {
    return Users.findOne({
      where: { id: userId }
    })
    .then(user => {
      return user.setChats(chat)
        .then(something => {
          return something
        })
    })
  })
  .catch(err => {
    return ' Err in posting chat:' + err
  })
}

chatsModel.DELETE_CHAT = (chatId) => {
  return Chats.findOne({
    where: { id: chatId }
  })
  .then(chat => {
    chat.destory()
  })
  .catch(err => {
    console.log('Err in posting chat', err)
  })
}

module.exports = chatsModel
