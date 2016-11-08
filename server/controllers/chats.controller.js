let chatsController = {}
let Chats = require('../models').Chats

chatsController.GET_CHAT_HISTORY = (req, res) => {
  Chats.GET_CHAT_HISTORY(req.params.userId)
    .then(history => {
      res.status(200).send(history)
    })
}

chatsController.DELETE_CHAT_HISTORY = (req, res) => {
  Chats.DELETE_CHAT_HISTORY(req.params.userId)
    .then(numDeleted => {
      res.status(200).send('Deleted chat history')
    })
}

chatsController.GET_CONVERSATION = (req, res) => {
  Chats.GET_CONVERSATION(req.params.userId, req.query.receiverId)
    .then(conversation => {
      res.status(200).send(conversation)
    })
}

chatsController.DELETE_CONVERSATION = (req, res) => {
  Chats.DELETE_CONVERSATION(req.params.userId, req.body.receiverId)
    .then(numDeleted => {
      res.status(200).send('Deleted conversation')
    })
}

chatsController.POST_CHAT = (req, res) => {
  Chats.POST_CHAT(req.params.userId, req.body.content, req.body.receiverId)
    .then(chat => {
      res.status(200).send(chat)
    })
}

chatsController.DELETE_CHAT = (req, res) => {
  Chats.DELETE_CHAT(req.params.userId, req.body.chatId)
    .then(numDeleted => {
      res.status(200).send('Deleted chat message')
    })
}

module.exports = chatsController
