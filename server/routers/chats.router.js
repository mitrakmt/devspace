let chatsRouter = require('express').Router()
let chatsController = require('../controllers').chatsController

// localhost:8000/api/chats/:userId
chatsRouter.route('/:userId')
  // both require req.params.userId
  .get(chatsController.GET_CHAT_HISTORY)
  .delete(chatsController.DELETE_CHAT_HISTORY)

// localhost:8000/api/chats/conversation/:userId
chatsRouter.route('/conversation/:userId')
  // requires req.params.userId and req.query.receiverId
  .get(chatsController.GET_CONVERSATION)
  //requires req.params.userId and req.body.receiverId
  .delete(chatsController.DELETE_CONVERSATION)

// localhost:8000/api/chats/chat/:userId
chatsRouter.route('/chat/:userId')
  // requires req.params.userId, req.body.content, req.body.receiverId
  .post(chatsController.POST_CHAT)
  // requires req.params.userId, req.body.chatId
  .delete(chatsController.DELETE_CHAT)

module.exports = chatsRouter
