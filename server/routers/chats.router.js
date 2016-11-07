let chatsRouter = require('express').Router()
let chatsController = require('../controllers').chatsController

chatsRouter.route('/:userId')
  .get(chatsController.GET_CHAT_HISTORY)
  .delete(chatsController.DELETE_CHAT_HISTORY)

chatsRouter.route('/conversation/:userId')
  .get(chatsController.GET_CONVERSATION)
  .delete(chatsController.DELETE_CONVERSATION)

chatsRouter.route('/chat/:userId')
  .post(chatsController.POST_CHAT)
  .delete(chatsController.DELETE_CHAT)

module.exports = chatsRouter
