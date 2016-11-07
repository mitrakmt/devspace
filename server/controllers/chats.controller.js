let chatsController = {}
let Chats = require('../models').Chats

chatsController.GET_CHAT_HISTORY = (req, res) => {
  console.log('inside get chat history', req.params.userId)
  Chats.GET_CHAT_HISTORY(req.params.userId)
    .then(history => {
      res.status(200).send(history)
    })
}

chatsController.DELETE_CHAT_HISTORY = (req, res) => {
  console.log('inside delete chat history')
  Chats.DELETE_CHAT_HISTORY(req.params.userId)
    .then(history => {
      res.status(200).send('Chat history deleted')
    })
}

chatsController.GET_CONVERSATION = (req, res) => {
  console.log('inside get conversation')
  Chats.GET_CONVERSATION(req.params.userId, req.body.receiverId)
    .then(conversation => {
      res.status(200).send(conversation)
    })
}

chatsController.DELETE_CONVERSATION = (req, res) => {
  console.log('inside delete conversation')
  Chats.DELETE_CONVERSATION(req.params.userId, req.body.receiverId)
    .then(conversation => {
      res.status(200).send('Conversation deleted')
    })
}

chatsController.POST_CHAT = (req, res) => {
  console.log('inside post chat', req)
  Chats.POST_CHAT(req.params.userId, req.body.content, req.body.receiverId)
    .then(chat => {
      res.status(200).send(chat)
    })
}
chatsController.DELETE_CHAT = (req, res) => {
  console.log('inside delete chat')
  Chats.DELETE_CHAT(req.body.chatId)
    .then(chat => {
      res.status(200).send('Deleted chat')
    })
}

module.exports = chatsController
