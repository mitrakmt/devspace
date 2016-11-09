let chatsRouter = require('express').Router()
let chatsController = require('../controllers').chatsController

chatsRouter.route('/history')
  // Both require req.headers.userid
  .get(chatsController.GET_CHAT_HISTORY)
  .delete(chatsController.DELETE_CHAT_HISTORY)

chatsRouter.route('/conversation/:receiverId')
  // Both require req.headers.userid and req.params.receiverId
  .get(chatsController.GET_CONVERSATION)
  .delete(chatsController.DELETE_CONVERSATION)

chatsRouter.route('/message/:receiverId')
  // Requires req.headers.userid, req.body.content, req.params.receiverId
  .post(chatsController.POST_MESSAGE)
  // Requires req.headers.userid, req.body.chatId
  .delete(chatsController.DELETE_MESSAGE)

module.exports = chatsRouter
