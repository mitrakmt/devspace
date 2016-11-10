let Chats = require('../models').chatsModel
let chatsController = {}

chatsController.GET_CHAT_HISTORY = (req, res) => {
  let userId = req.headers['userid']

  Chats.GET_CHAT_HISTORY(userId)
    .then(history => {
      res.status(200).send(history)
    })
}

chatsController.DELETE_CHAT_HISTORY = (req, res) => {
  let userId = req.headers['userid']

  Chats.DELETE_CHAT_HISTORY(userId)
    .then(numDeleted => {
      res.status(200).send('Deleted chat history')
    })
}

chatsController.GET_CONVERSATION = (req, res) => {
  let userId = req.headers['userid']
  let receiverId = req.params.receiverId

  Chats.GET_CONVERSATION(userId, receiverId)
    .then(conversation => {
      res.status(200).send(conversation)
    })
}

chatsController.DELETE_CONVERSATION = (req, res) => {
  let userId = req.headers['userid']
  let receiverId = req.params.receiverId

  Chats.DELETE_CONVERSATION(userId, receiverId)
    .then(numDeleted => {
      res.status(200).send('Deleted conversation')
    })
}

chatsController.POST_MESSAGE = (req, res) => {
  let userId = req.headers['userid']
  let content = req.body.content
  let receiverId = req.params.receiverId

  Chats.POST_MESSAGE(userId, content, receiverId)
    .then(chat => {
      res.status(200).send(chat)
    })
}

chatsController.DELETE_MESSAGE = (req, res) => {
  let userId = req.headers['userid']
  let chatId = req.body.chatId

  Chats.DELETE_MESSAGE(userId, chatId)
    .then(numDeleted => {
      res.status(200).send('Deleted chat message')
    })
}

module.exports = chatsController
